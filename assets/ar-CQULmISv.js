const menu = {
  book: "كتب",
  note: "ملحوظات",
  setting: "يثبت",
  recycleBin: "سلة المهملات"
};
const setting = {
  chooseLanguage: "اختر لغة",
  chooseTheme: "اختر نمطا",
  language: "لغة",
  theme: "سمة",
  userSetting: "إعدادات المستخدم",
  autoHighlightDesc: "بعد الفتح، عند تحديد النص، سيتم تمييزه تلقائيًا.",
  autoHighlightTitle: "ما إذا كان سيتم التمييز تلقائيًا أم لا",
  bookMode: "وضع رف الكتب",
  mode: "نموذج",
  noteShowClassDesc: "بعد الإغلاق، لن يتم عرض نمط التمييز إلا عند تمرير الماوس فوقه.",
  noteShowClassTitle: "ما إذا كانت الملاحظات تعرض نمط التمييز أم لا",
  openNewDesc: "إذا لم يكن الأمر كذلك، فسيكون القارئ موجودًا في الصفحة الحالية فقط.",
  openNewTitle: "ما إذا كان القارئ يفتح صفحة جديدة",
  openRecycleBinDesc: "أغلق سلة المحذوفات عندما تقوم بحذف كتاب، سيتم حذفه نهائيًا بدلاً من نقله إلى سلة المحذوفات.",
  openRecycleBinTitle: "قم بتشغيل وظيفة سلة المحذوفات",
  readMode: "وضع القراءة",
  rememberPositionDesc: "بعد فتحه، سيؤدي الدخول إلى واجهة القراءة مرة أخرى إلى الانتقال تلقائيًا إلى موضع القراءة الأخير.",
  rememberPositionTitle: "ما إذا كنت تريد تذكر موضع القراءة الأخير",
  autoHighlight: "تسليط الضوء التلقائي"
};
const unfound = {
  desc: "عذرًا، لا يمكننا العثور على الصفحة. \nستجد الكثير لتستكشفه على الصفحة الرئيسية.",
  tip: "الرجوع إلى الصفحة الرئيسية",
  title: "الصفحة مفقودة"
};
const file = {
  upload: "تحميل الملفات",
  choose: "حدد مستندًا",
  dragFile: "قم بسحب وإسقاط الملفات هنا",
  exist: "الملف موجود بالفعل",
  releaseMouse: "الافراج عن الماوس",
  uploadSuccess: "تحميل ناجح",
  supportFormat: "التنسيقات المدعومة:"
};
const common = {
  or: "أو",
  addBookshelf: "أضف رف الكتب",
  addLove: "إضافة مفضلات",
  detail: "تفاصيل",
  edit: "يحرر",
  forceRemove: "الحذف بشكل نهائي",
  remove: "يمسح",
  removeLove: "إزالة المفضلة",
  restore: "استعادة",
  score: "نتيجة",
  unknown: "مجهول",
  close: "إنهاء",
  copySuccess: "تم النسخ بنجاح",
  cancel: "يلغي",
  sure: "يتأكد",
  minute: "نقطة",
  addSuccess: "اضيف بنجاح",
  empty: "فارغ",
  removeSuccess: "تمت الإزالة بنجاح",
  removeFail: "فشل في الحذف",
  restoreFail: "فشلت عملية الاستعادة",
  editFail: "فشل التعديل",
  updateFail: "فشل التحديث",
  add: "اضف إليه",
  copy: "ينسخ"
};
const readMode = {
  double: "وضع الصفحة المزدوجة",
  scroll: "وضع التمرير",
  section: "وضع الفصل"
};
const bookMode = {
  bookshelf: "وضع رف الكتب",
  card: "وضع البطاقة",
  list: "وضع القائمة"
};
const book = {
  author: "مؤلف",
  bookshelf: "رف الكتب",
  createTime: "createTime",
  detail: "تفاصيل الكتاب",
  highlightLen: "عدد النقاط البارزة",
  name: "عنوان كتاب",
  notesLen: "عدد الملاحظات",
  openCount: "عدد مرات القراءة",
  page: "عدد الصفحات",
  publishTime: "تاريخ النشر",
  publisher: "الناشر",
  readProgress: "تقدم القراءة",
  score: "نتيجة",
  size: "مقاس",
  totalReadTime: "إجمالي وقت القراءة",
  updateTime: "تحديث الوقت",
  readDetailFail: "فشل في قراءة تفاصيل الكتاب",
  thisReadTime: "وقت القراءة هذا",
  addToBookshelfFail: "فشلت الإضافة إلى رف الكتب",
  addToBookshelfSuccess: "تمت الإضافة إلى رف الكتب بنجاح",
  addToBookshelf: "أضف إلى رف الكتب",
  getBookshelfFail: "فشل الحصول على رف الكتب",
  neeSelectBookshelf: "الرجاء تحديد رف الكتب",
  needBookshelfName: "الرجاء إدخال اسم رف الكتب",
  cover: "غلاف الكتاب",
  needAuhor: "الرجاء إدخال اسم المؤلف",
  needBookName: "الرجاء إدخال عنوان الكتاب",
  uploadCover: "تحميل الغلاف",
  uploadCoverFial: "فشل تحميل الغلاف",
  forceRemove: "احذف هذا الكتاب نهائيًا",
  moveToRecycleBin: "انقل هذا الكتاب إلى سلة المهملات",
  removeBook: "حذف الكتاب",
  empty: "قائمة الكتب فارغة",
  needScore: "الرجاء إدخال التقييم",
  recycleNoRecord: "لا يوجد سجل للبيانات المحذوفة في سلة المحذوفات!",
  uploadBookTip: "انقر فوق زر التحميل لتحميل كتاب محليًا، ثم ابدأ في الانغماس في بحر الكتب!",
  getBookFail: "فشل في الحصول على الكتاب",
  getBookListFail: "فشل في قراءة قائمة الكتب",
  getBookReadTimeFail: "فشل في قراءة قائمة وقت قراءة الكتاب",
  getBookReadTimeListFail: "فشل في قراءة قائمة وقت قراءة الكتاب",
  importBookFail: "فشل استيراد الكتب",
  recordBookTimeFail: "فشل في تسجيل وقت القراءة",
  needAuthor: "الرجاء إدخال اسم المؤلف",
  uploadCoverFail: "فشل تحميل الغلاف",
  jumpToBookList: "انتقل إلى قائمة الكتب",
  jumpToLastPosition: "انتقل إلى موضع القراءة الأخير"
};
const note = {
  addNoteFail: "فشلت إضافة ملاحظة",
  getNoteFail: "فشل في قراءة قائمة الملاحظات",
  getNoteListFail: "فشل في قراءة قائمة الملاحظات",
  empty: "قائمة الملاحظات فارغة",
  emptyNoteListTip: "في واجهة قائمة الكتب الخاصة بك، حدد كتابًا لقراءته، ثم حدد النص الذي يجذب انتباهك، وأدخل أفكارك في مربع الحوار المنبثق",
  forceRemove: "احذف هذه الملاحظة نهائيًا",
  noteDetail: "تفاصيل الملاحظة",
  removeSuccess: "تم حذف الملاحظة بنجاح",
  sureRemove: "تأكيد حذف الملاحظة",
  placeholder: "أكتب أفكارك في هذا الوقت...",
  write: "كتابة الأفكار"
};
const tag = {
  needTag: "الرجاء إدخال العلامة",
  removeTagSuccess: "تم حذف العلامة بنجاح"
};
const statistics = {
  bookUnit: "كتاب",
  noteUnit: "الفصل",
  readTime: "مدة",
  readTimeUnit: "ساعة",
  readTotalTime: "المدة الإجمالية",
  readed: "قرأت",
  reading: "قراءة",
  thisMouthNote: "ملاحظات لهذا الشهر",
  thisMouthReadTime: "مدة هذا الشهر",
  thisMouthReaded: "اقرأ هذا الشهر",
  thisMouthReading: "القراءة هذا الشهر",
  total: "المبلغ الكلي",
  myLove: "المفضل لدي",
  currentReading: "القراءة مؤخرا"
};
const line = {
  beeline: "خط مستقيم",
  marker: "علامة",
  wavy: "خطوط متموجة"
};
const pdf = {
  auto: "التحجيم التلقائي",
  pageActual: "الحجم الأصلي",
  pageFit: "تتناسب مع الصفحة",
  pageWidth: "تناسب عرض الصفحة"
};
const ar = {
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
  ar as default,
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
