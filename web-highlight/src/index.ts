import {
  EventEmitter,
  EventErrorData,
  EventHandlerMap,
  EventTypeEnum,
  INTERNAL_ERROR_EVENT,
  MouseOrTouchEvent,
  errorEventEimtter,
  getInteraction
} from './event'
import { CreateFrom } from './event/enum'
import { HookMap, getHooks, handleHookCall } from './hook'
import { DomMeta, DomSource } from './interface'
import { Mode } from './mode'
import { Options, getOption, setOption } from './option'
import { PaintUntil } from './paint'
import { rangeUtil } from './range'
import { rangeToSource } from './source'
import { Store } from './store'
import { isLen } from './util/array'
import { DATA_WEB_HIGHLIGHT } from './util/const'
import {
  addClass,
  getAttr,
  listener,
  removeClass,
  replaceClass,
  selctorAll,
  unListener
} from './util/dom'
import { ERROR } from './util/err'
import { isHighlightWrapNode, isNull } from './util/is'

export {
  CreateFrom,
  DATA_WEB_HIGHLIGHT,
  EventTypeEnum,
  Mode as HMode,
  type DomMeta,
  type DomSource
}

export class WebHighlight extends EventEmitter<EventHandlerMap<WebHighlight>> {
  private _store: Store

  private _hooks: HookMap

  private _hoverId: string | null = null

  private readonly _event = getInteraction()

  private _paint: PaintUntil

  constructor(option?: Partial<Options>) {
    super()

    // 合并配置
    if (option) {
      // TODO 待实现 忽略的标签列表
      setOption(option)
    }

    this._store = new Store()

    this._hooks = getHooks()

    this._paint = new PaintUntil(this._store)

    this.addListener()

    errorEventEimtter.on(INTERNAL_ERROR_EVENT, this.__handleError)
  }

  setOption = (option: Partial<Options>) => {
    if (option.root) {
      this.removeListener()
    }

    setOption(option)

    if (option.root) {
      this.addListener()
    }
  }

  fromRange = (range: Range) => {
    const res = rangeToSource(range)
    if (!res) return
    const removeIds = new Set<string>()
    const { id, source } = res
    let isPainted = false

    // 选区后就高亮划线
    if (getOption().auto) {
      const sources = source.filter((item) => {
        const [painted, ids] = this._handlePaintWrap(item)
        if (painted) {
          isPainted = true
          ids.forEach((id) => removeIds.add(id))
        }

        return painted
      })

      // 替换不同章节内容还未替换掉的旧wrap
      if (removeIds.size) {
        removeIds.forEach((id) => {
          this._paint.replaceExtraOldWrap(id, source[0].id)
          this._store.remove(id)
        })
      }

      if (isPainted) {
        this._store.save(id, sources)
        this.emit(
          EventTypeEnum.CREATE,
          { id, sources, type: CreateFrom.rang, removeIds: [...removeIds] },
          this
        )

        rangeUtil.removeAll()
      }
    } else {
      source.forEach((item) => {
        const ids = this._paint.getRemoveIds(item)
        ids.forEach((id) => removeIds.add(id))
      })
    }

    return { source, isPainted, removeIds: [...removeIds] }
  }

  fromSource = (id: string, source: DomSource[]) => {
    const data = new Map<string, DomSource[]>()
    source.forEach((item) => {
      const id = item.id
      const list = data.get(id) || []
      list.push(item)
      data.set(id, list)
    })

    data.forEach((sourceList) => {
      const removeIds = new Set<string>()
      const sources = sourceList.filter((item) => {
        const [painted, ids] = this._handlePaintWrap(item)
        if (painted) {
          ids.forEach((id) => removeIds.add(id))
        }
        return painted
      })

      if (isLen(sources)) {
        this._store.save(id, sources)

        this.emit(
          EventTypeEnum.CREATE,
          { id, sources, type: CreateFrom.source, removeIds: [...removeIds] },
          this
        )
        sources.map((item) => handleHookCall(item, this._hooks.record.saveSource, item.id, item))
      }
    })
  }

  getDomsById = (id: string) => {
    return selctorAll(`[${DATA_WEB_HIGHLIGHT}='${id}']`, getOption().root)
  }

  getSourceById = (id: string) => {
    return this._store.get(id)
  }

  // getDomNode = (source: DomSource, isStart = true) => {
  //   const { startDomMeta, endDomMeta } = source
  //   const domMeta = isStart ? startDomMeta : endDomMeta

  //   return getDomNode({ source, domMeta })
  // }

  remove = (id: string) => {
    const source = this.getSourceById(id)
    if (!source) {
      return
    }

    this._store.remove(id)

    if (isLen(source)) {
      this._paint.remove(source[0])

      this.emit(EventTypeEnum.REMOVE, { ids: [id] }, this)
    }
  }

  removeAll = () => {
    this._paint.removeAll()

    const ids = this._store.removeAll()

    this.emit(EventTypeEnum.REMOVE, { ids }, this)
  }

  dispose = () => {
    this.removeListener()

    this.offAll()

    this._store.removeAll()
  }

  addClass = (id: string, className: string) => {
    this._handleClass(id, (note) => addClass(note, className))
  }

  removeClass = (id: string, className: string) => {
    this._handleClass(id, (note) => removeClass(note, className))
  }

  replaceClass(id: string, newClassName: string, oldClassName: string) {
    this._handleClass(id, (note) => replaceClass(note, newClassName, oldClassName))
  }

  click = (event: MouseOrTouchEvent) => {
    const target = event.target as HTMLElement
    if (isHighlightWrapNode(target)) {
      const id = getAttr(target, DATA_WEB_HIGHLIGHT)
      const source = this.getSourceById(id)

      if (source) {
        if (source.length > 1) {
          const page = getAttr(target, getOption().pageAttribateName)
          const data = source.find((item) => item.page === page)
          if (data) {
            this.emit(EventTypeEnum.CLICK, { id, target, source: data }, this, event)
          }
        } else {
          this.emit(EventTypeEnum.CLICK, { id, target, source: source[0] }, this, event)
        }
      }
    } else {
      this.emit(EventTypeEnum.CLICK, { target }, this, event)
    }
  }

  hover = (event: MouseOrTouchEvent) => {
    const target = event.target as HTMLElement

    // 移除
    if (!isHighlightWrapNode(target)) {
      this._hoverId && this.emit(EventTypeEnum.HOVER_OUT, { id: this._hoverId }, this, event)
      this._hoverId = null

      return
    }

    const id = getAttr(target, DATA_WEB_HIGHLIGHT)

    // 触发的是同一个标签
    if (id === this._hoverId) {
      return
    }

    // 移除上一个hover标签
    if (this._hoverId) {
      this.emit(EventTypeEnum.HOVER_OUT, { id: this._hoverId }, this, event)
    }

    this._hoverId = id

    this.emit(EventTypeEnum.HOVER_OUT, { id: this._hoverId }, this, event)
  }

  private addListener = () => {
    const { root, dynamic } = getOption()

    if (!dynamic) {
      listener(root, this._event.PointerOver, this.hover as EventListenerOrEventListenerObject)

      listener(root, this._event.PointerTap, this.click as EventListenerOrEventListenerObject)

      listener(root, this._event.PointerEnd, this._handleSelection)
    }
  }

  private removeListener = () => {
    const root = getOption().root

    unListener(root, this._event.PointerOver, this.hover as EventListenerOrEventListenerObject)

    unListener(root, this._event.PointerTap, this.click as EventListenerOrEventListenerObject)

    unListener(root, this._event.PointerEnd, this._handleSelection)
  }

  private _handleClass(id: string, cb: (node: HTMLElement) => void) {
    const source = this.getSourceById(id)
    if (!source || !isLen(source)) {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_ID_INDVALID,
        error: `Can't find the highlight source by the id 【${id}】`
      })

      return
    }

    const doms = selctorAll(
      `${source[0].tagName}[${DATA_WEB_HIGHLIGHT}='${source[0].id}']`,
      getOption().root
    )

    if (isLen(doms)) {
      doms.forEach((dom) => cb(dom))
    } else {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_DOM_NOT_FOUND,
        error: `Can't find the highlight dom by the id 【${source[0].id}】`,
        detail: source[0]
      })
    }
  }

  private _handleSelection = () => {
    const range = rangeUtil.get()

    if (range) {
      const res = this.fromRange(range)

      if (res) {
        const { source, isPainted, removeIds } = res
        this.emit(EventTypeEnum.SOURCE, { source, isPainted, range, removeIds }, this)
      }
    }
  }

  private _handlePaintWrap(source: DomSource): [boolean, string[]] {
    let result: boolean = false
    const removeIds = new Set<string>()

    const res = this._paint.create(source)

    if (!isNull(res)) {
      const { wrap, ids } = res
      if (isLen(wrap)) {
        handleHookCall(source, this._hooks.record.saveSource, source.id, source)

        result = true
        ids.forEach((id) => removeIds.add(id))
      } else {
        errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
          type: ERROR.PAINT_HIGHLIGHT_FAIL,
          error: `Failed to draw highlighted note content.`,
          detail: source
        })
      }
    }

    return [result, [...removeIds]]
  }

  private __handleError = (data: EventErrorData) => {
    if (getOption().showError) {
      console.warn(data)
    }
  }
}
