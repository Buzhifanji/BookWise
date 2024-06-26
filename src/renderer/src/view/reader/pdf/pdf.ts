import { $ } from '@renderer/shared'
import { GlobalWorkerOptions, PDFDocumentProxy, getDocument } from 'pdfjs-dist'

import { NoteAction } from '@renderer/components'
import { ReadMode } from '@renderer/enum'
import { settingStore } from '@renderer/store'
import {
  EventBus,
  GenericL10n,
  PDFFindController,
  PDFLinkService,
  PDFViewer
} from 'pdfjs-dist/web/pdf_viewer'
import { highlighter } from '../highlight'
import { getSourceTarget } from '../util'

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).href

class PDFTool {
  pdfViewer: PDFViewer | null = null // pdf 上下文
  pdfDocument: PDFDocumentProxy | null = null
  bookId: string | null = null

  async render(content: ArrayBuffer, bookId: string) {
    this.bookId = bookId
    return new Promise(async (resolve, reject) => {
      try {
        const container = $(`#viewerContainer`) as HTMLDivElement
        const eventBus = new EventBus()

        const linkService = new PDFLinkService({ eventBus })

        const findController = new PDFFindController({ eventBus, linkService })

        const l10n = new GenericL10n('zh-CN')

        const view = new PDFViewer({
          container: container,
          eventBus,
          linkService,
          findController,
          l10n
        })

        view.currentScale = settingStore.value.pdfScale

        linkService.setViewer(view)

        const loadingTask = getDocument(content)

        const pdfDocument = await loadingTask.promise

        view.setDocument(pdfDocument)

        linkService.setDocument(pdfDocument, null)

        this.pdfViewer = view

        this.pdfDocument = pdfDocument

        // 监听 页面渲染完成，通知上层绘制笔记内容
        eventBus.on('textlayerrendered', (value: any) => {
          this.drawHighlight(value.pageNumber.toString())
        })

        eventBus.on('pagesloaded', (value: any) => {
          view.currentScaleValue = 'auto'
          setSpreadMode(settingStore.value.readMode)
          resolve('')
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async getOutline() {
    const outline = (await this.pdfDocument?.getOutline()) || []
    const result = outline.map(this.makeTOCItem)
    await this.handleToc(result)
    return result
  }

  async pageJump(pageNumber: number, id?: string) {
    this.pdfViewer!.scrollPageIntoView({ pageNumber })
    await this.drawHighlight(pageNumber.toString())
    if (id) {
      const target = getSourceTarget(pageNumber, id)
      if (!target) return

      target.scrollIntoView()
    }

    return
  }

  async drawHighlight(page: string) {
    try {
      if (!this.bookId) return
      const notes = await NoteAction.findBookPageNotes(this.bookId!, page)
      const domSource = notes.map((note) => NoteAction.noteToDomSource(note))
      highlighter?.fromSource(domSource)
    } catch (err) {
      console.log(err)
    }
  }

  getCurrentPageNumber() {
    return this.pdfViewer?.currentPageNumber
  }

  // 切换阅读模式
  setSpreadMode(mode: 0 | 1 | 2) {
    if (this.pdfViewer) {
      this.pdfViewer.spreadMode = mode
    }
  }

  resize() {
    const pdfViewer = this.pdfViewer
    if (!pdfViewer) return

    const currentScaleValue = pdfViewer.currentScaleValue
    if (
      currentScaleValue === 'auto' ||
      currentScaleValue === 'page-fit' ||
      currentScaleValue === 'page-width'
    ) {
      // Note: the scale is constant for 'page-actual'.
      pdfViewer.currentScaleValue = currentScaleValue
    }

    pdfViewer.update()
  }

  setScale(val: string | number) {
    const pdfViewer = this.pdfViewer
    if (!pdfViewer) return

    pdfViewer.currentScaleValue = val
  }

  zoomIn() {
    this.updateZoom(1)
    return this.pdfViewer?.currentScale || 1
  }

  zoomOut() {
    this.updateZoom(-1)
    return this.pdfViewer?.currentScale || 1
  }

  async resolveHref(href: string) {
    const parsed = JSON.parse(href)
    const pdf = this.pdfDocument!
    const dest = typeof parsed === 'string' ? await pdf.getDestination(parsed) : parsed
    const index = await pdf.getPageIndex(dest[0])
    return { index }
  }

  destroy() {
    this.pdfDocument?.destroy()
    this.pdfViewer = null
    this.pdfDocument = null
  }

  finishRender() {
    return new Promise<string>((resovle) => {
      this.pdfViewer!.eventBus.on('textlayerrendered', (value: any) => {
        console.log('================')
        resovle('ok')
      })
    })
  }

  async spreadMode() {}

  private async handleToc(toc: any[]) {
    const list: any = []
    const eachToc = (data: any[]) => {
      data.forEach((item) => {
        list.push(item)
        if (Array.isArray(item.subitems)) {
          eachToc(item.subitems)
        }
      })
    }
    eachToc(toc)
    await Promise.all(
      list.map(async (item: any) => {
        const res = await this.resolveHref(item.href)
        item.page = res.index + 1
      })
    )
    for (let i = 0; i < list.length; i++) {
      const currunt = list[i]
      const next = list[i + 1]
      if (next) {
        currunt.nextPage = next.page
      } else {
        currunt.nextPage = this.pdfDocument!.numPages + 1
      }
    }
  }

  private makeTOCItem = (item: any) => ({
    label: item.title,
    href: JSON.stringify(item.dest),
    subitems: item.items.length ? item.items.map(this.makeTOCItem) : null
  })

  private updateZoom(steps: number) {
    const pdfViewer = this.pdfViewer
    if (!pdfViewer) return

    if (pdfViewer.isInPresentationMode) {
      return
    }

    pdfViewer.updateScale({
      drawingDelay: { value: 400, kind: 0x02 + 0x80 },
      steps,
      scaleFactor: undefined,
      originL: undefined
    })
  }
}

export const PDF = new PDFTool()

export function setSpreadMode(mode: ReadMode) {
  if (mode === ReadMode.sroll) {
    PDF.setSpreadMode(0)
  } else if (mode === ReadMode.section) {
    PDF.setSpreadMode(2)
  } else if (mode === ReadMode.double) {
    PDF.setSpreadMode(1)
  } else {
    PDF.setSpreadMode(0)
  }
}
