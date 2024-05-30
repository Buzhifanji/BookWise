export class Reader {
  style: {
    spacing: number
    justify: boolean
    hyphenate: boolean
  }

  annotations: Map<any, any>

  annotationsByValue: Map<any, any>

  open(file: any): Promise<any>

  getToc(): any[]

  goTo(href: string): void

  getMetadata(): any

  destroy(): void
  getCover(): Blob | undefined

  static handleAuthor(author: any): string
  static handleLanguage(author: any): string
}
