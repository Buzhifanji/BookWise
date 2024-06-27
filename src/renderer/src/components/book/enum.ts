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
