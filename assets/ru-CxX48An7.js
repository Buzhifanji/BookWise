const menu = {
  book: "книги",
  note: "примечания",
  setting: "настраивать",
  recycleBin: "корзина"
};
const setting = {
  chooseLanguage: "Выберите язык",
  chooseTheme: "Выберите тему",
  language: "язык",
  theme: "тема",
  userSetting: "пользовательские настройки",
  autoHighlightDesc: "После открытия, когда текст выделен, он будет автоматически выделен.",
  autoHighlightTitle: "Стоит ли автоматически выделять",
  bookMode: "режим книжной полки",
  mode: "модель",
  noteShowClassDesc: "После закрытия стиль выделения будет отображаться только при наведении на него указателя мыши.",
  noteShowClassTitle: "Отображается ли в заметках стиль выделения",
  openNewDesc: "В противном случае читатель будет находиться только на текущей странице.",
  openNewTitle: "Открывает ли читатель новую страницу",
  openRecycleBinDesc: "Закройте корзину. Когда вы удаляете книгу, она будет удалена навсегда, а не перемещена в корзину.",
  openRecycleBinTitle: "Включите функцию корзины",
  readMode: "режим чтения",
  rememberPositionDesc: "После его открытия при повторном входе в интерфейс чтения автоматически произойдет переход к последней позиции чтения.",
  rememberPositionTitle: "Запоминать ли последнюю позицию чтения",
  autoHighlight: "Автоматическое выделение"
};
const unfound = {
  desc: "К сожалению, мы не можем найти страницу. \nНа главной странице вы найдете много интересного.",
  tip: "вернуться на домашнюю страницу",
  title: "Страница отсутствует"
};
const file = {
  upload: "загрузить файлы",
  choose: "Выберите документ",
  dragFile: "Перетащите файлы сюда",
  exist: "Файл уже существует",
  releaseMouse: "Отпустите мышь",
  uploadSuccess: "Загрузка успешна",
  supportFormat: "Поддерживаемые форматы:"
};
const common = {
  or: "или",
  addBookshelf: "Добавить книжную полку",
  addLove: "добавить избранное",
  detail: "Подробности",
  edit: "редактировать",
  forceRemove: "удалить навсегда",
  remove: "удалить",
  removeLove: "Удалить избранное",
  restore: "восстанавливаться",
  score: "счет",
  unknown: "неизвестный",
  close: "закрытие",
  copySuccess: "Скопировано успешно",
  cancel: "Отмена",
  sure: "подтверждать",
  minute: "точка",
  addSuccess: "Добавлено успешно",
  empty: "Пустой",
  removeSuccess: "Удален успешно",
  removeFail: "не удалось удалить",
  restoreFail: "Восстановление не удалось",
  editFail: "Изменить не удалось",
  updateFail: "Не удалось обновить",
  add: "добавить в",
  copy: "копировать"
};
const readMode = {
  double: "Двухстраничный режим",
  scroll: "режим прокрутки",
  section: "Режим главы"
};
const bookMode = {
  bookshelf: "режим книжной полки",
  card: "режим карты",
  list: "режим списка"
};
const book = {
  author: "автор",
  bookshelf: "книжная полка",
  createTime: "СоздатьВремя",
  detail: "Подробности книги",
  highlightLen: "Количество основных моментов",
  name: "Заголовок книги",
  notesLen: "Количество нот",
  openCount: "количество раз прочтения",
  page: "Количество страниц",
  publishTime: "Дата публикации",
  publisher: "Издатель",
  readProgress: "прогресс чтения",
  score: "счет",
  size: "размер",
  totalReadTime: "Общее время чтения",
  updateTime: "Время обновления",
  readDetailFail: "Не удалось прочитать сведения о книге.",
  thisReadTime: "Это время чтения",
  addToBookshelfFail: "Добавить на полку не удалось",
  addToBookshelfSuccess: "Успешно добавлено на книжную полку",
  addToBookshelf: "Добавить на книжную полку",
  getBookshelfFail: "Не удалось получить книжную полку",
  neeSelectBookshelf: "Пожалуйста, выберите книжную полку",
  needBookshelfName: "Пожалуйста, введите название книжной полки",
  cover: "книжная обложка",
  needAuhor: "Пожалуйста, введите имя автора",
  needBookName: "Пожалуйста, введите название книги",
  uploadCover: "Загрузить обложку",
  uploadCoverFial: "Не удалось загрузить обложку",
  forceRemove: "Удалить эту книгу навсегда",
  moveToRecycleBin: "Отправьте эту книгу в корзину",
  removeBook: "удалить книгу",
  empty: "Список книг пуст",
  needScore: "Пожалуйста, введите рейтинг",
  recycleNoRecord: "В Корзине нет записей об удаленных данных!",
  uploadBookTip: "Нажмите кнопку загрузки, чтобы загрузить книгу локально, а затем начните погружаться в море книг!",
  getBookFail: "Не удалось получить книгу",
  getBookListFail: "Не удалось прочитать список книг.",
  getBookReadTimeFail: "Не удалось прочитать список времени чтения книг.",
  getBookReadTimeListFail: "Не удалось прочитать список времени чтения книг.",
  importBookFail: "Не удалось импортировать книги.",
  recordBookTimeFail: "Не удалось записать время чтения.",
  needAuthor: "Пожалуйста, введите имя автора",
  uploadCoverFail: "Не удалось загрузить обложку",
  jumpToBookList: "Перейти к списку книг",
  jumpToLastPosition: "Перейти к последней позиции чтения"
};
const note = {
  addNoteFail: "Не удалось добавить заметку",
  getNoteFail: "Не удалось прочитать список заметок.",
  getNoteListFail: "Не удалось прочитать список заметок.",
  empty: "Список заметок пуст",
  emptyNoteListTip: "В интерфейсе списка книг выберите книгу для чтения, затем выберите текст, который привлекает ваше внимание, и введите свои мысли во всплывающем диалоговом окне.",
  forceRemove: "Удалить эту заметку навсегда",
  noteDetail: "Обратите внимание на детали",
  removeSuccess: "Заметка успешно удалена",
  sureRemove: "Подтвердить удаление заметки",
  placeholder: "Запишите свои мысли в это время...",
  write: "писать идеи"
};
const tag = {
  needTag: "Пожалуйста, введите тег",
  removeTagSuccess: "Тег успешно удален"
};
const statistics = {
  bookUnit: "Книга",
  noteUnit: "Глава",
  readTime: "продолжительность",
  readTimeUnit: "Час",
  readTotalTime: "общая продолжительность",
  readed: "Прочитал",
  reading: "чтение",
  thisMouthNote: "Примечания за этот месяц",
  thisMouthReadTime: "Продолжительность этого месяца",
  thisMouthReaded: "Прочтите в этом месяце",
  thisMouthReading: "Читаем в этом месяце",
  total: "Общая сумма",
  myLove: "мой любимый",
  currentReading: "Недавно читал"
};
const line = {
  beeline: "прямая линия",
  marker: "маркер",
  wavy: "волнистые линии"
};
const pdf = {
  auto: "Автоматическое масштабирование",
  pageActual: "фактический размер",
  pageFit: "по размеру страницы",
  pageWidth: "Подогнать по ширине страницы"
};
const ru = {
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
  ru as default,
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
