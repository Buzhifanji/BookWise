export class Reader {
  blobs: Map<string, Blob>
  book: any

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
