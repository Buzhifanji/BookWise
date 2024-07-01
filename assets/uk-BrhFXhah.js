const menu = {
  book: "книги",
  note: "Примітки",
  setting: "Налаштування",
  recycleBin: "кошик"
};
const setting = {
  chooseLanguage: "Виберіть мову",
  chooseTheme: "Виберіть тему",
  language: "мова",
  theme: "тема",
  userSetting: "налаштування користувача",
  autoHighlightDesc: "Після відкриття, коли текст буде виділено, він буде автоматично виділений.",
  autoHighlightTitle: "Чи автоматично виділяти",
  bookMode: "режим книжкової полиці",
  mode: "модель",
  noteShowClassDesc: "Після закриття стиль виділення відображатиметься лише тоді, коли по ньому буде наведено курсор миші.",
  noteShowClassTitle: "Чи відображаються в нотатках стиль виділення",
  openNewDesc: "Якщо ні, читач буде лише на поточній сторінці.",
  openNewTitle: "Чи відкриває читач нову сторінку",
  openRecycleBinDesc: "Закрийте кошик. Коли ви видаляєте книгу, вона буде видалена назавжди, а не переміщена до кошика.",
  openRecycleBinTitle: "Увімкніть функцію кошика",
  readMode: "режим читання",
  rememberPositionDesc: "Після його відкриття повторний вхід в інтерфейс читання автоматично перейде до останньої позиції читання.",
  rememberPositionTitle: "Чи запам'ятовувати позицію останнього читання",
  autoHighlight: "Автоматичне виділення"
};
const unfound = {
  desc: "Вибачте, ми не можемо знайти сторінку. \nНа домашній сторінці ви знайдете багато цікавого.",
  tip: "назад на головну сторінку",
  title: "Сторінка відсутня"
};
const file = {
  upload: "завантажувати файли",
  choose: "Виберіть документ",
  dragFile: "Перетягніть файли сюди",
  exist: "Файл уже існує",
  releaseMouse: "Відпустіть мишку",
  uploadSuccess: "Завантаження успішне",
  supportFormat: "Підтримувані формати:"
};
const common = {
  or: "або",
  addBookshelf: "Додайте книжкову полицю",
  addLove: "додати вибране",
  detail: "Подробиці",
  edit: "редагувати",
  forceRemove: "видалити остаточно",
  remove: "видалити",
  removeLove: "Видалити вибране",
  restore: "одужати",
  score: "рахунок",
  unknown: "невідомий",
  close: "закриття",
  copySuccess: "Успішно скопійовано",
  cancel: "Скасувати",
  sure: "підтвердити",
  minute: "точка",
  addSuccess: "Успішно додано",
  empty: "Порожній",
  removeSuccess: "Успішно видалено",
  removeFail: "не вдалося видалити",
  restoreFail: "Не вдалося відновити",
  editFail: "Помилка редагування",
  updateFail: "Не вдалося оновити",
  add: "Додати до",
  copy: "копія"
};
const readMode = {
  double: "Режим подвійної сторінки",
  scroll: "режим прокручування",
  section: "Режим розділу"
};
const bookMode = {
  bookshelf: "режим книжкової полиці",
  card: "режим картки",
  list: "режим списку"
};
const book = {
  author: "автор",
  bookshelf: "книжкова полиця",
  createTime: "createTime",
  detail: "Деталі книги",
  highlightLen: "Кількість підсвіток",
  name: "назва книги",
  notesLen: "Кількість нот",
  openCount: "кількість прочитаних разів",
  page: "Кількість сторінок",
  publishTime: "Дата публікації",
  publisher: "Видавець",
  readProgress: "прогрес читання",
  score: "рахунок",
  size: "розмір",
  totalReadTime: "Загальний час читання",
  updateTime: "Час оновлення",
  readDetailFail: "Не вдалося прочитати деталі книги",
  thisReadTime: "Цей час читання",
  addToBookshelfFail: "Не вдалося додати на книжкову полицю",
  addToBookshelfSuccess: "Додано на книжкову полицю",
  addToBookshelf: "Додати на книжкову полицю",
  getBookshelfFail: "Не вдалося отримати книжкову полицю",
  neeSelectBookshelf: "Виберіть книжкову полицю",
  needBookshelfName: "Введіть назву книжкової полиці",
  cover: "Обкладинка книги",
  needAuhor: "Будь ласка, введіть ім'я автора",
  needBookName: "Будь ласка, введіть назву книги",
  uploadCover: "Завантажити обкладинку",
  uploadCoverFial: "Не вдалося завантажити обкладинку",
  forceRemove: "Видалити цю книгу назавжди",
  moveToRecycleBin: "Перемістіть цю книгу в кошик",
  removeBook: "видалити книгу",
  empty: "Список книг порожній",
  needScore: "Будь ласка, введіть оцінку",
  recycleNoRecord: "Немає записів про видалені дані в кошику!",
  uploadBookTip: "Натисніть кнопку завантаження, щоб завантажити книгу локально, а потім почніть занурюватися в море книг!",
  getBookFail: "Не вдалося отримати книгу",
  getBookListFail: "Не вдалося прочитати список книг",
  getBookReadTimeFail: "Не вдалося прочитати список часу читання книги",
  getBookReadTimeListFail: "Не вдалося прочитати список часу читання книги",
  importBookFail: "Не вдалося імпортувати книги",
  recordBookTimeFail: "Не вдалося записати час читання",
  needAuthor: "Будь ласка, введіть ім'я автора",
  uploadCoverFail: "Не вдалося завантажити обкладинку",
  jumpToBookList: "Перейти до списку книг",
  jumpToLastPosition: "Перехід до останньої позиції читання"
};
const note = {
  addNoteFail: "Не вдалося додати примітку",
  getNoteFail: "Не вдалося прочитати список нотаток",
  getNoteListFail: "Не вдалося прочитати список нотаток",
  empty: "Список приміток порожній",
  emptyNoteListTip: "В інтерфейсі списку книг виберіть книгу для читання, потім виберіть текст, який привертає вашу увагу, і введіть свої думки у спливаючому діалоговому вікні",
  forceRemove: "Видалити цю нотатку назавжди",
  noteDetail: "Примітка деталей",
  removeSuccess: "Нотатку успішно видалено",
  sureRemove: "Підтвердити видалення нотатки",
  placeholder: "Запишіть свої думки в цей час...",
  write: "пишіть ідеї"
};
const tag = {
  needTag: "Будь ласка, введіть тег",
  removeTagSuccess: "Тег успішно видалено"
};
const statistics = {
  bookUnit: "книга",
  noteUnit: "Розділ",
  readTime: "тривалість",
  readTimeUnit: "годину",
  readTotalTime: "загальна тривалість",
  readed: "Прочитав",
  reading: "читання",
  thisMouthNote: "Примітки за цей місяць",
  thisMouthReadTime: "Тривалість цього місяця",
  thisMouthReaded: "Читайте цього місяця",
  thisMouthReading: "Читання цього місяця",
  total: "Загальна сума",
  myLove: "мій улюблений",
  currentReading: "Читала нещодавно"
};
const line = {
  beeline: "пряма лінія",
  marker: "маркер",
  wavy: "хвилясті лінії"
};
const pdf = {
  auto: "Автоматичне масштабування",
  pageActual: "реальний розмір",
  pageFit: "розмір сторінки",
  pageWidth: "Підгонка до ширини сторінки"
};
const uk = {
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
  uk as default,
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
