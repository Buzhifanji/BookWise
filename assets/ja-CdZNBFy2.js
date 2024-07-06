const menu = {
  book: "本",
  note: "ノート",
  setting: "設定",
  recycleBin: "ゴミ箱"
};
const setting = {
  chooseLanguage: "言語を選択してください",
  chooseTheme: "テーマの選択",
  language: "言語",
  theme: "テーマ",
  userSetting: "ユーザー設定",
  autoHighlightDesc: "開いた後、テキストを選択すると、自動的に強調表示されます。",
  autoHighlightTitle: "自動的に強調表示するかどうか",
  bookMode: "本棚モード",
  mode: "モデル",
  noteShowClassDesc: "閉じた後、ハイライト スタイルはマウスをその上にスライドさせた場合にのみ表示されます。",
  noteShowClassTitle: "ノートにハイライトスタイルを表示するかどうか",
  openNewDesc: "そうでない場合、読者は現在のページのみにアクセスすることになります。",
  openNewTitle: "読者が新しいページを開くかどうか",
  openRecycleBinDesc: "ごみ箱を閉じます。書籍を削除すると、その書籍はごみ箱に移動されずに完全に削除されます。",
  openRecycleBinTitle: "ごみ箱機能をオンにする",
  readMode: "読書モード",
  rememberPositionDesc: "開いた後、再度読み取りインターフェイスに入ると、最後の読み取り位置に自動的にジャンプします。",
  rememberPositionTitle: "最後に読んだ位置を記憶するかどうか",
  autoHighlight: "自動ハイライト"
};
const unfound = {
  desc: "申し訳ありませんが、ページが見つかりません。\nホームページでは調べられることがたくさん見つかります。",
  tip: "ホームページに戻る",
  title: "ページがありません"
};
const file = {
  upload: "ファイルをアップロードする",
  choose: "ドキュメントを選択してください",
  dragFile: "ここにファイルをドラッグ アンド ドロップします",
  exist: "ファイルが既に存在します",
  releaseMouse: "マウスを放します",
  uploadSuccess: "アップロード成功",
  supportFormat: "サポートされている形式:"
};
const common = {
  or: "または",
  addBookshelf: "本棚を追加する",
  addLove: "お気に入りを追加する",
  detail: "詳細",
  edit: "編集",
  forceRemove: "完全に削除する",
  remove: "消去",
  removeLove: "お気に入りを削除する",
  restore: "回復する",
  score: "スコア",
  unknown: "未知",
  close: "閉鎖",
  copySuccess: "正常にコピーされました",
  cancel: "キャンセル",
  sure: "確認する",
  minute: "ポイント",
  addSuccess: "正常に追加されました",
  empty: "空の",
  removeSuccess: "正常に削除されました",
  removeFail: "削除に失敗しました",
  restoreFail: "復元に失敗しました",
  editFail: "編集に失敗しました",
  updateFail: "アップデートに失敗しました",
  add: "に追加",
  copy: "コピー",
  prewView: "前のページ",
  getFirstView: "すでに最初のページ",
  getLastView: "もう最後のページ",
  nextView: "次のページ",
  comeFrom: "から"
};
const readMode = {
  double: "見開きモード",
  scroll: "スクロールモード",
  section: "チャプターモード"
};
const bookMode = {
  bookshelf: "本棚モード",
  card: "カードモード",
  list: "リストモード"
};
const book = {
  author: "著者",
  bookshelf: "本棚",
  createTime: "作成時間",
  detail: "本の詳細",
  highlightLen: "ハイライトの数",
  name: "本のタイトル",
  notesLen: "ノートの数",
  openCount: "読んだ回数",
  page: "ページ数",
  publishTime: "発行日",
  publisher: "出版社",
  readProgress: "読書の進み具合",
  score: "スコア",
  size: "サイズ",
  totalReadTime: "合計読書時間",
  updateTime: "更新時間",
  readDetailFail: "書籍の詳細を読み取れませんでした",
  thisReadTime: "今回の読書時間は",
  addToBookshelfFail: "本棚に追加できませんでした",
  addToBookshelfSuccess: "本棚に正常に追加されました",
  addToBookshelf: "本棚に追加する",
  getBookshelfFail: "本棚の取得に失敗しました",
  neeSelectBookshelf: "本棚を選択してください",
  needBookshelfName: "本棚名を入力してください",
  cover: "ブックカバー",
  needAuhor: "著者名を入力してください",
  needBookName: "本のタイトルを入力してください",
  uploadCover: "表紙をアップロードする",
  uploadCoverFial: "表紙のアップロードに失敗しました",
  forceRemove: "この本を完全に削除します",
  moveToRecycleBin: "この本をゴミ箱に移動します",
  removeBook: "本を削除する",
  empty: "書籍リストが空です",
  needScore: "評価を入力してください",
  recycleNoRecord: "ごみ箱には削除されたデータの記録はありません。",
  uploadBookTip: "アップロード ボタンをクリックして本をローカルにアップロードし、本の海に浸り始めましょう。",
  getBookFail: "本の取得に失敗しました",
  getBookListFail: "書籍リストの読み取りに失敗しました",
  getBookReadTimeFail: "本の読書時間リストを読み取れませんでした",
  getBookReadTimeListFail: "本の読書時間リストを読み取れませんでした",
  importBookFail: "書籍のインポートに失敗しました",
  recordBookTimeFail: "読書時間を記録できませんでした",
  needAuthor: "著者名を入力してください",
  uploadCoverFail: "表紙のアップロードに失敗しました",
  jumpToBookList: "書籍リストへジャンプ",
  jumpToLastPosition: "最後の読み取り位置にジャンプ"
};
const note = {
  addNoteFail: "メモの追加に失敗しました",
  getNoteFail: "メモリストの読み込みに失敗しました",
  getNoteListFail: "メモリストの読み込みに失敗しました",
  empty: "ノートリストが空です",
  emptyNoteListTip: "書籍リストのインターフェイスで、読みたい本を選択し、注目を集めるテキストを選択して、ポップアップ ダイアログ ボックスに感想を入力します。",
  forceRemove: "このメモを完全に削除します",
  noteDetail: "注意事項の詳細",
  removeSuccess: "メモは正常に削除されました",
  sureRemove: "メモの削除を確認する",
  placeholder: "この時の感想を書いてみる…",
  write: "アイデアを書く",
  myNote: "私のノート"
};
const tag = {
  needTag: "タグを入力してください",
  removeTagSuccess: "タグが正常に削除されました"
};
const statistics = {
  bookUnit: "本",
  noteUnit: "章",
  readTime: "間隔",
  readTimeUnit: "時間",
  readTotalTime: "合計期間",
  readed: "読んだことがある",
  reading: "読む",
  thisMouthNote: "今月のメモ",
  thisMouthReadTime: "今月の期間",
  thisMouthReaded: "今月読んだ",
  thisMouthReading: "今月の読書",
  total: "総量",
  myLove: "私のお気に入り",
  currentReading: "最近読んだ本"
};
const line = {
  beeline: "直線",
  marker: "マーカー",
  wavy: "波線"
};
const pdf = {
  auto: "オートスケーリング",
  pageActual: "実際のサイズ",
  pageFit: "ページに合わせる",
  pageWidth: "ページ幅に合わせる"
};
const ja = {
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
  ja as default,
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