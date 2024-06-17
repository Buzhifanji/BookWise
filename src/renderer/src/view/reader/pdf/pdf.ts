import { $ } from '@renderer/shared'
import { useStorage } from '@vueuse/core'
import { GlobalWorkerOptions, PDFDocumentProxy, getDocument } from 'pdfjs-dist'

import {
  EventBus,
  GenericL10n,
  PDFFindController,
  PDFLinkService,
  PDFViewer
} from 'pdfjs-dist/web/pdf_viewer'

const default_scale = 1 * window.devicePixelRatio

const SCALE = useStorage<number>('pdf_reader_scale', default_scale) // 展示比例

const dd = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url)

console.log(dd)

GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).href

class PDFTool {
  rendition: PDFViewer | null = null // pdf 上下文
  pdfDocument: PDFDocumentProxy | null = null

  async render(content: ArrayBuffer) {
    return new Promise(async (resolve, reject) => {
      try {
        // if (!GlobalWorkerOptions.workerSrc) {
        //   const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.worker.min.js')).default
        //   const workerSrc = new URL(
        //     '../../../../../../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js',
        //     import.meta.url
        //   ).href
        //   console.log(workerSrc)
        //   GlobalWorkerOptions.workerSrc = workerSrc
        // }
        const container = $(`#pdfViewer`) as HTMLDivElement
        console.log(container)
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

        const outline = await pdfDocument.getOutline()

        const metadata = await pdfDocument.getMetadata()

        console.log(outline, metadata)

        view.setDocument(pdfDocument)

        linkService.setDocument(pdfDocument, null)

        this.rendition = view

        this.pdfDocument = pdfDocument

        // 监听 页面渲染完成，通知上层绘制笔记内容
        eventBus.on('textlayerrendered', (value: any) => {})

        eventBus.on('pagesloaded', () => {
          view.currentScale = SCALE.value
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async getOutline() {
    return (await this.pdfDocument?.getOutline()) || []
  }
}

export const PDF = new PDFTool()
