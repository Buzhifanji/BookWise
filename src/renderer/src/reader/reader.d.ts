export class Reader {
  blobs: Map<string, Blob>
  book: any
  bookType: string

  viewport: { width: number; height: number } // pdf 格式独有
  scale: number // pdf 格式独有
  type: string // pdf 格式独有
  /**
   * pdf 格式独有
   */
  init(scale: number): void

  open(file: any): Promise<void>

  getImgBlob(href: string): null | Blob

  getMetadata(): any

  getCover(): Promise<Blob | undefined>

  getSections(): Promise<string[]>

  handSection(index: number): Promise<{ height: number; html: any; id: any }>

  resolveNavigation(value: any): { index: number; anchor?: (doc: HTMLElement) => HTMLElement }

  isExternal(value: string): boolean

  destroy(): void

  static handleAuthor(author: any): string
  static handleLanguage(author: any): string
}
