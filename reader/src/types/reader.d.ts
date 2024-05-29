export class Reader {
  style: {
    spacing: number,
    justify: boolean,
    hyphenate: boolean,
  }

  annotations: Map<any, any>

  annotationsByValue: Map<any, any>

  open(file: any): Promise<void>

  getToc(): any[]

  goTo(href: string): void

  getMetadata(): any

  destroy(): void
}