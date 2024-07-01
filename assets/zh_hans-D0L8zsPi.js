const menu = {
  book: "图书",
  note: "笔记",
  setting: "设置",
  recycleBin: "回收站"
};
const setting = {
  userSetting: "用户设置",
  language: "语言",
  theme: "主题",
  chooseLanguage: "选择语言",
  chooseTheme: "选择主题",
  mode: "模式",
  bookMode: "书架模式",
  readMode: "阅读模式",
  openNewTitle: "阅读器是否打开新页面",
  openNewDesc: "如果是否，将阅读器只会在当前页面。",
  openRecycleBinTitle: "开启回收站功能",
  openRecycleBinDesc: "关闭回收站，删除书籍的时候，将会被永久删除，而不是移到回收站",
  noteShowClassTitle: "笔记是否显示高亮样式",
  noteShowClassDesc: "关闭后，当鼠标滑过的时候，才会显示高亮样式",
  autoHighlightTitle: "是否自动高亮",
  autoHighlightDesc: "打开后，在选中文字的时候，会自动高亮",
  rememberPositionTitle: "是否记住上次阅读位置",
  rememberPositionDesc: "打开后，再次进入阅读界面，将会自动跳转到上次阅读的位置",
  autoHighlight: "自动高亮"
};
const unfound = {
  title: "页面不见了",
  desc: "抱歉，我们找不到该页面。您会在主页上发现很多值得探索的内容。",
  tip: "回到首页"
};
const file = {
  upload: "上传文件",
  choose: "选择文件",
  dragFile: "拖拽文件到此处",
  exist: "文件已存在",
  releaseMouse: "释放鼠标",
  supportFormat: "支持格式：",
  uploadSuccess: "上传成功"
};
const common = {
  or: "或",
  restore: "恢复",
  forceRemove: "永久删除",
  removeLove: "移除最爱",
  addLove: "添加最爱",
  addBookshelf: "添加书架",
  remove: "删除",
  edit: "编辑",
  score: "评分",
  detail: "详情",
  unknown: "未知",
  close: "关闭",
  copySuccess: "复制成功",
  cancel: "取消",
  sure: "确认",
  minute: "分",
  addSuccess: "添加成功",
  removeSuccess: "移除成功",
  empty: "空空如也",
  removeFail: "删除失败",
  editFail: "编辑失败",
  restoreFail: "还原失败",
  updateFail: "更新失败",
  add: "添加",
  copy: "复制"
};
const readMode = {
  scroll: "滚动模式",
  section: "章节模式",
  double: "双页模式"
};
const bookMode = {
  bookshelf: "书架模式",
  card: "卡片模式",
  list: "列表模式"
};
const book = {
  detail: "书籍详情",
  name: "书名",
  author: "作者",
  size: "大小",
  page: "页数",
  publisher: "出版商",
  publishTime: "出版时间",
  createTime: "创建时间",
  updateTime: "更新时间",
  score: "评分",
  openCount: "阅读次数",
  readProgress: "阅读进度",
  totalReadTime: "阅读总时长",
  highlightLen: "高亮数量",
  notesLen: "笔记数量",
  bookshelf: "书架",
  readDetailFail: "读取书籍详情失败",
  thisReadTime: "本次阅读时长",
  addToBookshelf: "添加到书架",
  needBookshelfName: "请输入书架名",
  neeSelectBookshelf: "请选择书架",
  addToBookshelfSuccess: "添加到书架成功",
  addToBookshelfFail: "添加到书架失败",
  getBookshelfFail: "获取书架失败",
  needBookName: "请输入书名",
  needAuhor: "请输入作者名",
  uploadCoverFial: "上传封面失败",
  cover: "书籍封面",
  uploadCover: "上传封面",
  removeBook: "删除书籍",
  moveToRecycleBin: "将本书移入回收站",
  forceRemove: "将本书永久删除",
  needScore: "请输入评分",
  recycleNoRecord: "回收站里没有删除数据的记录！",
  empty: "图书列表为空",
  uploadBookTip: "点击上传按钮，从本地上传一份书籍，然后开始沉浸书海吧！",
  importBookFail: "导入图书失败",
  getBookFail: "获取图书失败",
  getBookListFail: "读取图书列表失败",
  recordBookTimeFail: "记录阅读时长失败",
  getBookReadTimeFail: "读取图书阅读时长列表失败",
  getBookReadTimeListFail: "读取图书阅读时长列表失败",
  jumpToBookList: "跳转到图书列表",
  jumpToLastPosition: "跳转到上次阅读位置"
};
const note = {
  addNoteFail: "添加笔记失败",
  getNoteFail: "读取笔记列表失败",
  getNoteListFail: "读取笔记列表失败",
  removeSuccess: "删除笔记成功",
  sureRemove: "确认删除笔记",
  forceRemove: "将该笔记永久删除",
  noteDetail: "笔记详情",
  empty: "笔记列表为空",
  emptyNoteListTip: "在您的书籍列表界面，选择一本阅读，然后选中吸引您注意力的文字，在弹出的对话框中输入您的思考",
  placeholder: "写下此时的想法...",
  write: "写想法"
};
const tag = {
  needTag: "请输入标签",
  removeTagSuccess: "删除标签成功"
};
const statistics = {
  reading: "在读",
  total: "总数量",
  thisMouthReading: "本月在读",
  bookUnit: "本",
  readed: "已读",
  thisMouthReaded: "本月已读",
  thisMouthNote: "本月笔记",
  noteUnit: "篇",
  readTime: "时长",
  readTotalTime: "总时长",
  thisMouthReadTime: "本月时长",
  readTimeUnit: "小时",
  currentReading: "最近在读",
  myLove: "我的最爱"
};
const line = {
  marker: "马克笔",
  beeline: "直线",
  wavy: "波浪线"
};
const pdf = {
  auto: "自动缩放",
  pageActual: "实际大小",
  pageFit: "适合页面",
  pageWidth: "适合页宽"
};
const zh_hans = {
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
  pdf
};
export {
  book,
  bookMode,
  common,
  zh_hans as default,
  file,
  line,
  menu,
  note,
  pdf,
  readMode,
  setting,
  statistics,
  tag,
  unfound
};
