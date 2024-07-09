const menu = {
  book: "圖書",
  note: "筆記",
  setting: "設置",
  recycleBin: "回收站"
};
const setting = {
  userSetting: "用戶設置",
  language: "語言",
  theme: "主題",
  chooseLanguage: "選擇語言",
  chooseTheme: "選擇主題",
  mode: "模式",
  bookMode: "書架模式",
  readMode: "閱讀模式",
  openNewTitle: "閱讀器是否打開新頁面",
  openNewDesc: "如果是否，將閱讀器只會在當前頁面。",
  openRecycleBinTitle: "開啟回收站功能",
  openRecycleBinDesc: "關閉回收站，刪除書籍的時候，將會被永久刪除，而不是移到回收站",
  noteShowClassTitle: "筆記是否顯示高亮樣式",
  noteShowClassDesc: "關閉後，當鼠標滑過的時候，才會顯示高亮樣式",
  autoHighlightTitle: "是否自動高亮",
  autoHighlightDesc: "打開後，在選中文字的時候，會自動高亮",
  rememberPositionTitle: "是否記住上次閱讀位置",
  rememberPositionDesc: "打開後，再次進入閱讀界面，將會自動跳轉到上次閱讀的位置",
  autoHighlight: "自動高亮"
};
const unfound = {
  title: "頁面不見了",
  desc: "抱歉，我們找不到該頁面。您會在主頁面上發現很多值得探索的內容。",
  tip: "回到首頁"
};
const file = {
  upload: "上傳文件",
  choose: "選擇文件",
  dragFile: "拖拽文件到此處",
  exist: "文件已存在",
  releaseMouse: "釋放鼠標",
  supportFormat: "支持格式：",
  uploadSuccess: "上傳成功"
};
const common = {
  or: "或",
  restore: "恢復",
  forceRemove: "永久刪除",
  removeLove: "移除最愛",
  addLove: "添加最愛",
  addBookshelf: "添加書架",
  remove: "刪除",
  edit: "編輯",
  score: "評分",
  detail: "詳細",
  unknown: "未知",
  close: "關閉",
  copySuccess: "複製成功",
  cancel: "取消",
  sure: "確認",
  minute: "分",
  addSuccess: "添加成功",
  removeSuccess: "移除成功",
  empty: "空空如也",
  removeFail: "刪除失敗",
  editFail: "編輯失敗",
  restoreFail: "還原失敗",
  updateFail: "更新失敗",
  add: "添加",
  copy: "複製",
  prewView: "上一页",
  nextView: "下一页",
  getLastView: "已經是最後一頁了",
  getFirstView: "已經是第一頁了",
  comeFrom: "來自",
  action: "操作",
  rename: "重命名"
};
const readMode = {
  scroll: "滾動模式",
  section: "章節模式",
  double: "雙頁模式"
};
const bookMode = {
  bookshelf: "書架模式",
  card: "卡片模式",
  list: "列表模式"
};
const book = {
  detail: "書籍詳細",
  name: "書名",
  author: "作者",
  size: "大小",
  page: "頁數",
  publisher: "出版商",
  publishTime: "出版時間",
  createTime: "創建時間",
  updateTime: "更新時間",
  score: "評分",
  openCount: "閱讀次數",
  readProgress: "閱讀進度",
  totalReadTime: "閱讀總時長",
  highlightLen: "高亮數量",
  notesLen: "筆記數量",
  bookshelf: "書架",
  readDetailFail: "讀取書籍詳細失敗",
  thisReadTime: "本次閱讀時長",
  addToBookshelf: "添加到書架",
  needBookshelfName: "請輸入書架名",
  neeSelectBookshelf: "請選擇書架",
  addToBookshelfSuccess: "添加到書架成功",
  addToBookshelfFail: "添加到書架失敗",
  getBookshelfFail: "獲取書架失敗",
  needBookName: "請輸入書名",
  needAuhor: "請輸入作者名",
  uploadCoverFial: "上傳封面失敗",
  cover: "書籍封面",
  uploadCover: "上傳封面",
  removeBook: "刪除書籍",
  moveToRecycleBin: "將本書移入回收站",
  forceRemove: "將本書永久刪除",
  needScore: "請輸入評分",
  recycleNoRecord: "回收站裡沒有刪除數據的記錄！",
  empty: "圖書列表為空",
  uploadBookTip: "點擊上傳按鈕，從本地上傳一份書籍，然後開始沉浸書海吧！",
  importBookFail: "導入圖書失敗",
  getBookFail: "獲取圖書失敗",
  getBookListFail: "讀取圖書列表失敗",
  recordBookTimeFail: "記錄閱讀時長失敗",
  getBookReadTimeFail: "獲取閱讀時長列表失敗",
  getBookReadTimeListFail: "獲取閱讀時長列表失敗",
  jumpToBookList: "跳轉到圖書列表",
  jumpToLastPosition: "跳轉到上次閱讀位置",
  removeBookshelfSuccess: "移除書架成功",
  bookshelfManage: "管理書架",
  bookshelfTitle: "書架名",
  bookNumber: "書籍數量",
  clearEmptyBookshelf: "一鍵清空書架",
  renameFail: "重命名書架失敗",
  removeBookshelftSuccess: "移除書架成功"
};
const note = {
  addNoteFail: "添加筆記失敗",
  getNoteFail: "讀取筆記列表失敗",
  getNoteListFail: "讀取筆記列表失敗",
  removeSuccess: "刪除筆記成功",
  sureRemove: "確認刪除筆記",
  forceRemove: "將該筆記永久刪除",
  noteDetail: "筆記詳細",
  empty: "筆記列表為空",
  emptyNoteListTip: "在您的書籍列表界面，選擇一本閱讀，然後選中吸引您注意力的文字，在彈出的對話框中輸入您的思考",
  placeholder: "寫下此時的想法...",
  write: "寫想法",
  myNote: "我的筆記",
  findNoteError: "數據丟失：本地未找到筆記",
  writeYouNore: "請輸入筆記內容",
  mode: "筆記模式",
  noteNumber: "筆記數量"
};
const tag = {
  name: "標簽",
  needTag: "請輸入標簽",
  removeTagSuccess: "刪除標簽成功",
  manage: "標簽管理",
  getTagListFail: "獲取標簽列表失敗",
  renameFail: "重命名書架失敗：",
  tagTitle: "標簽名",
  clearEmptyTag: "一鍵清空標簽"
};
const statistics = {
  reading: "在讀",
  total: "總數量",
  thisMouthReading: "本月在讀",
  bookUnit: "本",
  readed: "已讀",
  thisMouthReaded: "本月已讀",
  thisMouthNote: "本月筆記",
  noteUnit: "篇",
  readTime: "時長",
  readTotalTime: "總時長",
  thisMouthReadTime: "本月時長",
  readTimeUnit: "小時",
  currentReading: "最近在讀",
  myLove: "我的最愛"
};
const line = {
  marker: "馬克筆",
  beeline: "直線",
  wavy: "波浪線"
};
const pdf = {
  auto: "自動縮放",
  pageActual: "實際大小",
  pageFit: "適合頁面",
  pageWidth: "適合頁寬"
};
const sort = {
  updateTime: "最近閱讀",
  addTime: "添加時間",
  readProgress: "閱讀進度",
  readTime: "閱讀時長",
  asc: "升序",
  desc: "降序"
};
const zh_hant = {
  menu,
  setting,
  unfound,
  file,
  common,
  readMode,
  bookMode,
  book,
  note,
  tag,
  statistics,
  line,
  pdf,
  sort
};
export {
  book,
  bookMode,
  common,
  zh_hant as default,
  file,
  line,
  menu,
  note,
  pdf,
  readMode,
  setting,
  sort,
  statistics,
  tag,
  unfound
};
