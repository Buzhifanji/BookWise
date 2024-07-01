const menu = {
  book: "کتاب ها",
  note: "یادداشت",
  setting: "تنظیمات",
  recycleBin: "سطل بازیافت"
};
const setting = {
  chooseLanguage: "یک زبان را انتخاب کنید",
  chooseTheme: "انتخاب قالب",
  language: "زبان",
  theme: "موضوع",
  userSetting: "تنظیمات کاربر",
  autoHighlightDesc: "پس از باز کردن، هنگامی که متن انتخاب می شود، به طور خودکار برجسته می شود.",
  autoHighlightTitle: "اینکه آیا به طور خودکار برجسته شود",
  bookMode: "حالت قفسه کتاب",
  mode: "مدل",
  noteShowClassDesc: "پس از بسته شدن، سبک هایلایت تنها زمانی نمایش داده می شود که ماوس روی آن بلغزد.",
  noteShowClassTitle: "آیا یادداشت‌ها سبک برجسته را نشان می‌دهند یا خیر",
  openNewDesc: "اگر نه، خواننده فقط در صفحه فعلی خواهد بود.",
  openNewTitle: "آیا خواننده صفحه جدیدی باز می کند",
  openRecycleBinDesc: "سطل بازیافت را ببندید وقتی کتابی را حذف می کنید، به جای اینکه به سطل بازیافت منتقل شود، برای همیشه حذف می شود.",
  openRecycleBinTitle: "عملکرد سطل بازیافت را روشن کنید",
  readMode: "حالت خواندن",
  rememberPositionDesc: "پس از باز کردن آن، ورود مجدد به رابط خواندن به طور خودکار به آخرین موقعیت خواندن می‌پرد.",
  rememberPositionTitle: "آیا آخرین موقعیت خواندن را به خاطر بسپارید یا خیر",
  autoHighlight: "هایلایت خودکار"
};
const unfound = {
  desc: "با عرض پوزش، ما نمی توانیم صفحه را پیدا کنیم. \nدر صفحه اصلی چیزهای زیادی برای کاوش خواهید یافت.",
  tip: "برگشت به صفحه اصلی",
  title: "صفحه از دست رفته است"
};
const file = {
  upload: "آپلود فایل ها",
  choose: "یک سند را انتخاب کنید",
  dragFile: "فایل ها را در اینجا بکشید و رها کنید",
  exist: "فایل از قبل موجود میباشد",
  releaseMouse: "ماوس را رها کنید",
  uploadSuccess: "آپلود با موفقیت انجام شد",
  supportFormat: "فرمت های پشتیبانی شده:"
};
const common = {
  or: "یا",
  addBookshelf: "قفسه کتاب اضافه کنید",
  addLove: "علاقه مندی ها را اضافه کن",
  detail: "جزئیات",
  edit: "ویرایش کنید",
  forceRemove: "برای همیشه حذف کنید",
  remove: "حذف",
  removeLove: "موارد دلخواه را حذف کنید",
  restore: "بهبود می یابند",
  score: "نمره",
  unknown: "ناشناخته",
  close: "بسته",
  copySuccess: "با موفقیت کپی شد",
  cancel: "لغو کنید",
  sure: "تایید",
  minute: "نقطه",
  addSuccess: "با موفقیت اضافه شد",
  empty: "خالی",
  removeSuccess: "با موفقیت حذف شد",
  removeFail: "حذف نشد",
  restoreFail: "بازیابی انجام نشد",
  editFail: "ویرایش انجام نشد",
  updateFail: "به روز رسانی نا موفق بود",
  add: "اضافه کردن به",
  copy: "کپی 🀄"
};
const readMode = {
  double: "حالت دو صفحه",
  scroll: "حالت اسکرول",
  section: "حالت فصل"
};
const bookMode = {
  bookshelf: "حالت قفسه کتاب",
  card: "حالت کارت",
  list: "حالت لیست"
};
const book = {
  author: "نویسنده",
  bookshelf: "قفسه کتاب",
  createTime: "createTime",
  detail: "جزئیات کتاب",
  highlightLen: "تعداد نکات برجسته",
  name: "عنوان کتاب",
  notesLen: "تعداد یادداشت ها",
  openCount: "تعداد دفعات خوانده شده",
  page: "تعدادی از صفحات",
  publishTime: "تاریخ انتشار",
  publisher: "ناشر",
  readProgress: "پیشرفت خواندن",
  score: "نمره",
  size: "اندازه",
  totalReadTime: "کل زمان مطالعه",
  updateTime: "زمان به روز رسانی",
  readDetailFail: "خواندن جزئیات کتاب ناموفق بود",
  thisReadTime: "این زمان خواندن",
  addToBookshelfFail: "افزودن به قفسه کتاب انجام نشد",
  addToBookshelfSuccess: "با موفقیت به قفسه کتاب اضافه شد",
  addToBookshelf: "به قفسه کتاب اضافه کنید",
  getBookshelfFail: "قفسه کتاب دریافت نشد",
  neeSelectBookshelf: "لطفا قفسه کتاب را انتخاب کنید",
  needBookshelfName: "لطفا نام قفسه کتاب را وارد کنید",
  cover: "جلد کتاب",
  needAuhor: "لطفا نام نویسنده را وارد کنید",
  needBookName: "لطفا عنوان کتاب را وارد کنید",
  uploadCover: "جلد را آپلود کنید",
  uploadCoverFial: "جلد آپلود نشد",
  forceRemove: "این کتاب را برای همیشه حذف کنید",
  moveToRecycleBin: "این کتاب را به سطل زباله منتقل کنید",
  removeBook: "حذف کتاب",
  empty: "لیست کتاب خالی است",
  needScore: "لطفا رتبه بندی را وارد کنید",
  recycleNoRecord: "هیچ سابقه ای از اطلاعات حذف شده در سطل بازیافت وجود ندارد!",
  uploadBookTip: "روی دکمه آپلود کلیک کنید تا یک کتاب به صورت محلی آپلود شود و سپس شروع به غوطه ور شدن در دریای کتاب کنید!",
  getBookFail: "کتاب دریافت نشد",
  getBookListFail: "خواندن فهرست کتاب ناموفق بود",
  getBookReadTimeFail: "فهرست زمان خواندن کتاب خوانده نشد",
  getBookReadTimeListFail: "فهرست زمان خواندن کتاب خوانده نشد",
  importBookFail: "وارد کردن کتاب ها انجام نشد",
  recordBookTimeFail: "زمان خواندن ثبت نشد",
  needAuthor: "لطفا نام نویسنده را وارد کنید",
  uploadCoverFail: "جلد آپلود نشد",
  jumpToBookList: "پرش به فهرست کتاب",
  jumpToLastPosition: "پرش به آخرین موقعیت خواندن"
};
const note = {
  addNoteFail: "یادداشت اضافه نشد",
  getNoteFail: "لیست یادداشت ها خوانده نشد",
  getNoteListFail: "لیست یادداشت ها خوانده نشد",
  empty: "لیست یادداشت خالی است",
  emptyNoteListTip: "در رابط فهرست کتاب خود، کتابی را برای خواندن انتخاب کنید، سپس متنی را که توجه شما را جلب می کند انتخاب کنید و افکار خود را در کادر محاوره ای بازشو وارد کنید.",
  forceRemove: "این یادداشت را برای همیشه حذف کنید",
  noteDetail: "جزئیات را یادداشت کنید",
  removeSuccess: "یادداشت با موفقیت حذف شد",
  sureRemove: "حذف یادداشت را تأیید کنید",
  placeholder: "در این زمان افکار خود را بنویسید...",
  write: "ایده بنویس"
};
const tag = {
  needTag: "لطفا برچسب را وارد کنید",
  removeTagSuccess: "برچسب با موفقیت حذف شد"
};
const statistics = {
  bookUnit: "کتاب",
  noteUnit: "فصل",
  readTime: "مدت زمان",
  readTimeUnit: "ساعت",
  readTotalTime: "کل مدت زمان",
  readed: "به عنوان خوانده شده اند",
  reading: "خواندن",
  thisMouthNote: "یادداشت های این ماه",
  thisMouthReadTime: "مدت این ماه",
  thisMouthReaded: "این ماه را بخوانید",
  thisMouthReading: "خواندن این ماه",
  total: "مقدار کل",
  myLove: "مورد علاقه من",
  currentReading: "اخیرا در حال خواندن"
};
const line = {
  beeline: "خط مستقیم",
  marker: "نشانگر",
  wavy: "خطوط مواج"
};
const pdf = {
  auto: "مقیاس بندی خودکار",
  pageActual: "اندازه واقعی",
  pageFit: "متناسب با صفحه",
  pageWidth: "متناسب با عرض صفحه"
};
const fa = {
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
  fa as default,
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
