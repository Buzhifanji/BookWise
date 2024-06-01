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
import { Mode, Options, getDefaultOption } from './option'
import { getSourceRemvoeIds, paint, removeAllPainted, removePainted } from './paint'
import { getDomNode } from './paint/dom'
import { getRange, getSourceFromRange, removeAllRanges } from './source'
import { Store } from './store'
import { isArray, isLen } from './util/array'
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
  private _option: Options = getDefaultOption()

  private _store: Store

  private _hooks: HookMap

  private _hoverId: string | null = null

  private readonly _event = getInteraction()

  constructor(option?: Partial<Options>) {
    super()

    // 合并配置
    if (option) {
      // TODO 待实现 忽略的标签列表
      this.setOption(option)
    }

    this._store = new Store()

    this._hooks = getHooks()

    this.addListener()

    errorEventEimtter.on(INTERNAL_ERROR_EVENT, this.__handleError)
  }

  setOption = (option: Partial<Options>) => {
    if (option.root) {
      this.removeListener()
    }

    Object.assign(this._option, option)

    if (option.root) {
      this.addListener()
    }
  }

  fromRange = (range: Range) => {
    const { className, tagName, root, auto, mode, context } = this._option
    let source = getSourceFromRange({
      range,
      root,
      className,
      tagName,
      mode,
      idHook: this._hooks.render.UUID
    })

    let isPainted = false

    let removeIds: string[] = []

    if (auto) {
      let [res, removeIds] = this._handlePaintWrap(source, range)

      isPainted = res

      if (isPainted) {
        this.emit(EventTypeEnum.CREATE, { sources: source, type: CreateFrom.rang, removeIds }, this)

        removeAllRanges(context)
      }
    } else {
      removeIds = getSourceRemvoeIds(source, root)
    }

    return { source, isPainted, removeIds }
  }

  fromSource = (source: DomSource | DomSource[]) => {
    if (!isArray(source)) {
      source = [source]
    }

    const sources: DomSource[] = []

    source.forEach((item) => {
      const [res, ids] = this._handlePaintWrap(item)
      if (res) {
        sources.push(item)

        this._store.save(item)

        this.emit(
          EventTypeEnum.CREATE,
          { sources: item, type: CreateFrom.source, removeIds: ids },
          this
        )
      }
    })

    if (isLen(sources)) {
      sources.map((item) => handleHookCall(item, this._hooks.record.saveSource, item.id, item))
    }
  }

  getDomsById = (id: string) => {
    return selctorAll(`[${DATA_WEB_HIGHLIGHT}='${id}']`, this._option.root)
  }

  getSourceById = (id: string) => {
    return this._store.get(id)
  }

  getDomNode = (source: DomSource, isStart = true) => {
    const { startDomMeta, endDomMeta } = source
    const domMeta = isStart ? startDomMeta : endDomMeta

    return getDomNode({ source, domMeta, root: this._option.root })
  }

  remove = (id: string) => {
    const source = this.getSourceById(id)
    if (!source) {
      return
    }

    this._store.remove(id)

    const { root, mode } = this._option

    removePainted({ source, root, mode, removeSourceHook: this._hooks.record.removeSource })

    this.emit(EventTypeEnum.REMOVE, { ids: [id] }, this)
  }

  removeAll = () => {
    const { root, tagName } = this._option

    removeAllPainted(root, tagName, this._hooks.record.removeSource)

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

      this.emit(EventTypeEnum.CLICK, { id, target, source }, this, event)
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
    const { root, dynamic } = this._option

    if (!dynamic) {
      listener(root, this._event.PointerOver, this.hover as EventListenerOrEventListenerObject)

      listener(root, this._event.PointerTap, this.click as EventListenerOrEventListenerObject)

      listener(root, this._event.PointerEnd, this._handleSelection)
    }
  }

  private removeListener = () => {
    const root = this._option.root

    unListener(root, this._event.PointerOver, this.hover as EventListenerOrEventListenerObject)

    unListener(root, this._event.PointerTap, this.click as EventListenerOrEventListenerObject)

    unListener(root, this._event.PointerEnd, this._handleSelection)
  }

  private _handleClass(id: string, cb: (node: HTMLElement) => void) {
    const source = this.getSourceById(id)
    if (!source) {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_ID_INDVALID,
        error: `Can't find the highlight source by the id 【${id}】`
      })

      return
    }

    const doms = selctorAll(
      `${source.tagName}[${DATA_WEB_HIGHLIGHT}='${source.id}']`,
      this._option.root
    )

    if (isLen(doms)) {
      doms.forEach((dom) => cb(dom))
    } else {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_DOM_NOT_FOUND,
        error: `Can't find the highlight dom by the id 【${source.id}】`,
        detail: source
      })
    }
  }

  private _handleSelection = () => {
    const { context } = this._option

    const range = getRange(context)

    if (range) {
      const { source, isPainted, removeIds } = this.fromRange(range)

      this.emit(EventTypeEnum.SOURCE, { source, isPainted, range, removeIds }, this)
    }
  }

  private _handlePaintWrap(source: DomSource, range?: Range): [boolean, string[]] {
    const { root, mode } = this._option
    let result: boolean = false
    const removeIds: string[] = []

    const res = paint({
      source,
      root,
      mode,
      store: this._store,
      selectNodeHook: this._hooks.render.selectNodes,
      wrapNodeHook: this._hooks.render.wrapNode,
      removeSourceHook: this._hooks.record.removeSource
    })

    if (!isNull(res)) {
      const { wrap, ids } = res
      if (isLen(wrap)) {
        const _source = handleHookCall(source, this._hooks.record.saveSource, source.id, source)

        this._store.save(_source)

        result = true

        removeIds.push(...ids)
      } else {
        errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
          type: ERROR.PAINT_HIGHLIGHT_FAIL,
          error: `Failed to draw highlighted note content.`,
          detail: source,
          range
        })
      }
    }

    return [result, removeIds]
  }

  private __handleError = (data: EventErrorData) => {
    if (this._option.showError) {
      console.warn(data)
    }
  }
}
