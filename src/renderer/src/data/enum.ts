export enum BookState {
  inbox, // 书架
  idle, // 闲置
  wantToRead, // 想读
  laterRead, // 稍后读
  abandonRead, // 弃读
  archive // 归档
}

export enum BookType {
  pdf = 'pdf',
  epub = 'epub',
  mobi = 'mobi',
  azw3 = 'azw3',
  fb2 = 'fb2',
  cbz = 'cbz'
}

/**
 * 阅读模式
 */
export enum ReadMode {
  /** 滚动模式 */
  scroll = 'scroll',
  /** 章节模式 */
  section = 'section',
  /**双栏 */
  double = 'dobule'
}

export enum BookshelftMode {
  /** 列表模式 */
  list = 'list',
  /** 卡片模式 */
  card = 'card',
  /** 书架模式 */
  bookshelf = 'bookshelf'
}

export enum NoteMode {
  card = 'card',
  list = 'list'
}
