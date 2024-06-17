import { $ } from '@renderer/shared'
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
  rendition: PDFViewer | null = null // pdf 上下文
  pdfDocument: PDFDocumentProxy | null = null

  async render(content: ArrayBuffer) {
    return new Promise(async (resolve, reject) => {
      try {
        const container = $(`#pdfViewer`) as HTMLDivElement
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

        this.rendition = view

        this.pdfDocument = pdfDocument

        // 监听 页面渲染完成，通知上层绘制笔记内容
        eventBus.on('textlayerrendered', (value: any) => {
          resolve('')
        })

        eventBus.on('pagesloaded', () => {
          view.currentScale = SCALE.value

          setSpreadMode(settingStore.value.readMode)
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
    this.rendition!.scrollPageIntoView({ pageNumber })
    return await this.finishRender()
  }

  setSpreadMode(mode: 0 | 1 | 2) {
    if (this.rendition) {
      this.rendition.spreadMode = mode
    }
  }

  async resolveHref(href: string) {
    const parsed = JSON.parse(href)
    const pdf = this.pdfDocument!
    const dest = typeof parsed === 'string' ? await pdf.getDestination(parsed) : parsed
    const index = await pdf.getPageIndex(dest[0])
    return { index }
  }

  finishRender() {
    return new Promise<string>((resovle) => {
      this.rendition!.eventBus.on('pagesloaded', (value: any) => {
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
