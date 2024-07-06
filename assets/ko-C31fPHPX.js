const menu = {
  book: "서적",
  note: "노트",
  setting: "설정",
  recycleBin: "쓰레기통"
};
const setting = {
  chooseLanguage: "언어를 선택하세요",
  chooseTheme: "테마 선택",
  language: "언어",
  theme: "주제",
  userSetting: "사용자 설정",
  autoHighlightDesc: "연 후 텍스트를 선택하면 자동으로 강조 표시됩니다.",
  autoHighlightTitle: "자동으로 강조 표시할지 여부",
  bookMode: "책장 모드",
  mode: "모델",
  noteShowClassDesc: "닫은 후 강조 스타일은 마우스를 그 위로 슬라이드할 때만 표시됩니다.",
  noteShowClassTitle: "메모에 강조 스타일이 표시되는지 여부",
  openNewDesc: "그렇지 않은 경우 독자는 현재 페이지에만 있게 됩니다.",
  openNewTitle: "독자가 새 페이지를 열었는지 여부",
  openRecycleBinDesc: "휴지통을 닫으세요. 책을 삭제하면 휴지통으로 이동되지 않고 영구 삭제됩니다.",
  openRecycleBinTitle: "휴지통 기능을 켜주세요",
  readMode: "읽기 모드",
  rememberPositionDesc: "그것을 연 후 읽기 인터페이스에 다시 들어가면 자동으로 마지막 읽기 위치로 이동합니다.",
  rememberPositionTitle: "마지막으로 읽은 위치를 기억할지 여부",
  autoHighlight: "자동 하이라이트"
};
const unfound = {
  desc: "죄송합니다. 페이지를 찾을 수 없습니다. \n홈페이지에서 많은 내용을 찾아보실 수 있습니다.",
  tip: "홈페이지로 돌아가기",
  title: "페이지가 누락되었습니다"
};
const file = {
  upload: "파일 업로드하다",
  choose: "문서를 선택하세요",
  dragFile: "여기에 파일을 드래그 앤 드롭하세요.",
  exist: "존재하는 파일입니다",
  releaseMouse: "마우스 놓기",
  uploadSuccess: "업로드 성공",
  supportFormat: "지원되는 형식:"
};
const common = {
  or: "또는",
  addBookshelf: "책장 추가",
  addLove: "즐겨찾기 추가",
  detail: "세부",
  edit: "편집하다",
  forceRemove: "영구적으로 삭제",
  remove: "삭제",
  removeLove: "즐겨찾기 제거",
  restore: "다시 덮다",
  score: "점수",
  unknown: "알려지지 않은",
  close: "폐쇄",
  copySuccess: "성공적으로 복사되었습니다",
  cancel: "취소",
  sure: "확인하다",
  minute: "가리키다",
  addSuccess: "성공적으로 추가되었습니다",
  empty: "비어 있는",
  removeSuccess: "성공적으로 제거되었습니다",
  removeFail: "삭제하지 못했습니다.",
  restoreFail: "복원 실패",
  editFail: "수정 실패",
  updateFail: "업데이트가 실패",
  add: "다음에 추가",
  copy: "복사",
  prewView: "이전 페이지",
  getFirstView: "벌써 첫 페이지",
  getLastView: "벌써 마지막 페이지야",
  nextView: "다음 페이지",
  comeFrom: "~에서"
};
const readMode = {
  double: "이중 페이지 모드",
  scroll: "스크롤 모드",
  section: "챕터 모드"
};
const bookMode = {
  bookshelf: "책장 모드",
  card: "카드 모드",
  list: "목록 모드"
};
const book = {
  author: "작가",
  bookshelf: "책장",
  createTime: "생성시간",
  detail: "도서 세부정보",
  highlightLen: "하이라이트 수",
  name: "책 제목",
  notesLen: "음표 수",
  openCount: "읽은 횟수",
  page: "페이지 수",
  publishTime: "출판일",
  publisher: "발행자",
  readProgress: "읽기 진행 상황",
  score: "점수",
  size: "크기",
  totalReadTime: "총 독서 시간",
  updateTime: "업데이트 시간",
  readDetailFail: "도서 세부정보를 읽지 못했습니다.",
  thisReadTime: "이번 독서시간",
  addToBookshelfFail: "책장에 추가하지 못했습니다.",
  addToBookshelfSuccess: "책장에 추가되었습니다.",
  addToBookshelf: "책장에 추가",
  getBookshelfFail: "책장을 가져오지 못했습니다.",
  neeSelectBookshelf: "책장을 선택해주세요",
  needBookshelfName: "책장 이름을 입력해주세요",
  cover: "책 표지",
  needAuhor: "작성자 이름을 입력하세요.",
  needBookName: "책 제목을 입력해주세요",
  uploadCover: "표지 업로드",
  uploadCoverFial: "표지를 업로드하지 못했습니다.",
  forceRemove: "이 책을 영구적으로 삭제하세요.",
  moveToRecycleBin: "이 책을 휴지통으로 이동하세요.",
  removeBook: "책 삭제",
  empty: "도서 목록이 비어 있습니다.",
  needScore: "등급을 입력해주세요",
  recycleNoRecord: "휴지통에는 삭제된 데이터에 대한 기록이 없습니다!",
  uploadBookTip: "업로드 버튼을 클릭해 로컬로 책을 업로드하고, 책의 바다에 빠져보세요!",
  getBookFail: "책을 가져오지 못했습니다.",
  getBookListFail: "도서 목록을 읽지 못했습니다.",
  getBookReadTimeFail: "책읽기시간 목록을 읽지 못했습니다.",
  getBookReadTimeListFail: "책읽기시간 목록을 읽지 못했습니다.",
  importBookFail: "책을 가져오지 못했습니다.",
  recordBookTimeFail: "독서 시간을 기록하지 못했습니다.",
  needAuthor: "작성자 이름을 입력하세요.",
  uploadCoverFail: "표지를 업로드하지 못했습니다.",
  jumpToBookList: "도서 목록으로 이동",
  jumpToLastPosition: "마지막 읽기 위치로 이동"
};
const note = {
  addNoteFail: "메모를 추가하지 못했습니다.",
  getNoteFail: "메모 목록을 읽지 못했습니다.",
  getNoteListFail: "메모 목록을 읽지 못했습니다.",
  empty: "메모 목록이 비어 있습니다.",
  emptyNoteListTip: "도서 목록 인터페이스에서 읽을 책을 선택한 다음 관심을 끄는 텍스트를 선택하고 팝업 대화 상자에 생각을 입력하세요.",
  forceRemove: "이 메모를 영구적으로 삭제하세요.",
  noteDetail: "세부정보 참고",
  removeSuccess: "메모가 삭제되었습니다.",
  sureRemove: "메모 삭제 확인",
  placeholder: "이때의 생각을 적어보세요...",
  write: "아이디어를 쓰다",
  myNote: "내 메모"
};
const tag = {
  needTag: "태그를 입력해주세요",
  removeTagSuccess: "태그가 삭제되었습니다."
};
const statistics = {
  bookUnit: "책",
  noteUnit: "장",
  readTime: "지속",
  readTimeUnit: "시간",
  readTotalTime: "총 기간",
  readed: "읽었다",
  reading: "독서",
  thisMouthNote: "이번 달의 메모",
  thisMouthReadTime: "이번 달 기간",
  thisMouthReaded: "이번 달 읽기",
  thisMouthReading: "이번 달 읽기",
  total: "총액",
  myLove: "내가 제일 좋아하는",
  currentReading: "최근에 읽고 있는 것"
};
const line = {
  beeline: "일직선",
  marker: "채점자",
  wavy: "물결 모양의 선"
};
const pdf = {
  auto: "자동 크기 조정",
  pageActual: "실제 크기",
  pageFit: "페이지에 맞추기",
  pageWidth: "페이지 너비에 맞추기"
};
const ko = {
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
  ko as default,
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
