import { $, pdfBus } from '@renderer/shared'
import { useStorage } from '@vueuse/core'
import { GlobalWorkerOptions, PDFDocumentProxy, getDocument } from 'pdfjs-dist'

import { ReadMode } from '@renderer/enum'
import { settingStore } from '@renderer/store'
import {
  EventBus,
  GenericL10n,
  PDFFindController,
  PDFLinkService,
  PDFViewer
} from 'pdfjs-dist/web/pdf_viewer'

const default_scale = 1 * window.devicePixelRatio

const SCALE = useStorage<number>('pdf_reader_scale', default_scale) // 展示比例

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).href

class PDFTool {
  pdfViewer: PDFViewer | null = null // pdf 上下文
  pdfDocument: PDFDocumentProxy | null = null

  async render(content: ArrayBuffer) {
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

        view.currentScale = default_scale

        linkService.setViewer(view)

        const loadingTask = getDocument(content)

        const pdfDocument = await loadingTask.promise

        console.log(pdfDocument)

        view.setDocument(pdfDocument)

        linkService.setDocument(pdfDocument, null)

        this.pdfViewer = view

        this.pdfDocument = pdfDocument

        // 监听 页面渲染完成，通知上层绘制笔记内容
        eventBus.on('textlayerrendered', (value: any) => {
          pdfBus.emit(value.pageNumber.toString())
        })

        eventBus.on('pagesloaded', () => {
          view.currentScale = SCALE.value
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
    return outline.map(this.makeTOCItem)
  }

  async pageJump(pageNumber: number) {
    this.pdfViewer!.scrollPageIntoView({ pageNumber })
    return await this.finishRender()
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
      this.pdfViewer!.eventBus.on('pagesloaded', (value: any) => {
        resovle('ok')
      })
    })
  }

  async spreadMode() {}

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
