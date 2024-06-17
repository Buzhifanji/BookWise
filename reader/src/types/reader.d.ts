export class Reader {
  blobs: Map<string, Blob>
  book: any

  viewport: { width: number; height: number } // pdf 格式独有
  scale: number // pdf 格式独有
  type: string // pdf 格式独有
  /**
   * pdf 格式独有
   */
  init(scale: number)

  open(file: any): Promise<void>

  getImgBlob(href: string): null | Blob

  getMetadata(): any

  getCover(): Promise<Blob | undefined>

  getSections(): Promise<string[]>

  resolveNavigation(value: any): { index: number }

  isExternal(value: string): boolean

  destroy(): void

  static handleAuthor(author: any): string
  static handleLanguage(author: any): string
}
