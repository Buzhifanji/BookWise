const menu = {
  book: "buku",
  note: "Nota",
  setting: "tetapan",
  recycleBin: "tong kitar semula"
};
const setting = {
  chooseLanguage: "Pilih bahasa",
  chooseTheme: "Pilih tema",
  language: "bahasa",
  theme: "tema",
  userSetting: "tetapan pengguna",
  autoHighlightDesc: "Selepas dibuka, apabila teks dipilih, ia akan diserlahkan secara automatik.",
  autoHighlightTitle: "Sama ada hendak menyerlahkan secara automatik",
  bookMode: "mod rak buku",
  mode: "model",
  noteShowClassDesc: "Selepas ditutup, gaya serlahan hanya akan dipaparkan apabila tetikus meluncur ke atasnya.",
  noteShowClassTitle: "Sama ada nota memaparkan gaya sorotan",
  openNewDesc: "Jika tidak, pembaca hanya akan berada di halaman semasa.",
  openNewTitle: "Sama ada pembaca membuka halaman baharu",
  openRecycleBinDesc: "Tutup Tong Kitar Semula Apabila anda memadamkan buku, ia akan dipadamkan secara kekal dan bukannya dialihkan ke Tong Kitar Semula.",
  openRecycleBinTitle: "Hidupkan fungsi tong kitar semula",
  readMode: "mod membaca",
  rememberPositionDesc: "Selepas membukanya, memasuki antara muka bacaan sekali lagi secara automatik akan melompat ke kedudukan bacaan terakhir.",
  rememberPositionTitle: "Sama ada untuk mengingati kedudukan bacaan terakhir",
  autoHighlight: "Sorotan automatik"
};
const unfound = {
  desc: "Maaf, kami tidak dapat mencari halaman. \nAnda akan temui banyak perkara untuk diterokai di halaman utama.",
  tip: "kembali ke laman utama",
  title: "Halaman itu tiada"
};
const file = {
  upload: "memuat naik fail",
  choose: "Pilih dokumen",
  dragFile: "Seret dan lepaskan fail di sini",
  exist: "Fail sudah wujud",
  releaseMouse: "Lepaskan tetikus",
  uploadSuccess: "Muat naik berjaya",
  supportFormat: "Format yang disokong:"
};
const common = {
  or: "atau",
  addBookshelf: "Tambah rak buku",
  addLove: "tambah kegemaran",
  detail: "Butiran",
  edit: "edit",
  forceRemove: "padam secara kekal",
  remove: "padam",
  removeLove: "Alih keluar kegemaran",
  restore: "pulih",
  score: "skor",
  unknown: "tidak diketahui",
  close: "penutupan",
  copySuccess: "Berjaya disalin",
  cancel: "Batal",
  sure: "mengesahkan",
  minute: "titik",
  addSuccess: "Berjaya ditambahkan",
  empty: "kosong",
  removeSuccess: "Berjaya dialih keluar",
  removeFail: "gagal memadam",
  restoreFail: "Pemulihan gagal",
  editFail: "Edit gagal",
  updateFail: "Kemas kini gagal",
  add: "Tambah ke",
  copy: "salinan",
  prewView: "Halaman sebelumnya",
  getFirstView: "Sudah muka surat pertama",
  getLastView: "Sudah halaman terakhir",
  nextView: "Muka surat seterusnya",
  comeFrom: "daripada"
};
const readMode = {
  double: "Mod muka surat dua",
  scroll: "mod tatal",
  section: "Mod bab"
};
const bookMode = {
  bookshelf: "mod rak buku",
  card: "mod kad",
  list: "mod senarai"
};
const book = {
  author: "pengarang",
  bookshelf: "rak buku",
  createTime: "createTime",
  detail: "Butiran buku",
  highlightLen: "Bilangan sorotan",
  name: "tajuk buku",
  notesLen: "Bilangan nota",
  openCount: "bilangan kali dibaca",
  page: "Bilangan muka surat",
  publishTime: "Tarikh diterbitkan",
  publisher: "Penerbit",
  readProgress: "kemajuan membaca",
  score: "skor",
  size: "saiz",
  totalReadTime: "Jumlah masa membaca",
  updateTime: "Masa kemas kini",
  readDetailFail: "Gagal membaca butiran buku",
  thisReadTime: "Masa membaca ini",
  addToBookshelfFail: "Gagal menambahkan pada rak buku",
  addToBookshelfSuccess: "Berjaya ditambahkan pada rak buku",
  addToBookshelf: "Tambah ke rak buku",
  getBookshelfFail: "Gagal mendapatkan rak buku",
  neeSelectBookshelf: "Sila pilih rak buku",
  needBookshelfName: "Sila masukkan nama rak buku",
  cover: "kulit buku",
  needAuhor: "Sila masukkan nama pengarang",
  needBookName: "Sila masukkan tajuk buku",
  uploadCover: "Muat naik muka depan",
  uploadCoverFial: "Gagal memuat naik muka depan",
  forceRemove: "Padamkan buku ini secara kekal",
  moveToRecycleBin: "Alihkan buku ini ke tong sampah",
  removeBook: "padam buku",
  empty: "Senarai buku kosong",
  needScore: "Sila masukkan rating",
  recycleNoRecord: "Tiada rekod data yang dipadam dalam Tong Kitar Semula!",
  uploadBookTip: "Klik butang muat naik untuk memuat naik buku secara tempatan, dan kemudian mula menyelami lautan buku!",
  getBookFail: "Gagal mendapatkan buku",
  getBookListFail: "Gagal membaca senarai buku",
  getBookReadTimeFail: "Gagal membaca senarai masa membaca buku",
  getBookReadTimeListFail: "Gagal membaca senarai masa membaca buku",
  importBookFail: "Gagal mengimport buku",
  recordBookTimeFail: "Gagal merekodkan masa membaca",
  needAuthor: "Sila masukkan nama pengarang",
  uploadCoverFail: "Gagal memuat naik muka depan",
  jumpToBookList: "Lompat ke senarai buku",
  jumpToLastPosition: "Lompat ke kedudukan bacaan terakhir"
};
const note = {
  addNoteFail: "Gagal menambah nota",
  getNoteFail: "Gagal membaca senarai nota",
  getNoteListFail: "Gagal membaca senarai nota",
  empty: "Senarai nota kosong",
  emptyNoteListTip: "Dalam antara muka senarai buku anda, pilih buku untuk dibaca, kemudian pilih teks yang menarik perhatian anda dan masukkan pemikiran anda dalam kotak dialog pop timbul",
  forceRemove: "Padamkan nota ini secara kekal",
  noteDetail: "Nota butiran",
  removeSuccess: "Nota berjaya dipadamkan",
  sureRemove: "Sahkan pemadaman nota",
  placeholder: "Tuliskan pendapat anda pada masa ini...",
  write: "menulis idea",
  myNote: "nota saya",
  findNoteError: "Kehilangan data: Nota tidak ditemui secara setempat",
  writeYouNore: "Sila masukkan kandungan nota"
};
const tag = {
  needTag: "Sila masukkan tag",
  removeTagSuccess: "Tag berjaya dipadamkan",
  name: "Label"
};
const statistics = {
  bookUnit: "Buku",
  noteUnit: "Bab",
  readTime: "tempoh masa",
  readTimeUnit: "Jam",
  readTotalTime: "jumlah tempoh",
  readed: "dah baca",
  reading: "membaca",
  thisMouthNote: "Nota untuk bulan ini",
  thisMouthReadTime: "Tempoh bulan ini",
  thisMouthReaded: "Baca bulan ini",
  thisMouthReading: "Membaca bulan ini",
  total: "Jumlah keseluruhan",
  myLove: "kegemaran saya",
  currentReading: "Membaca baru-baru ini"
};
const line = {
  beeline: "garis lurus",
  marker: "penanda",
  wavy: "garisan beralun"
};
const pdf = {
  auto: "Penskalaan automatik",
  pageActual: "saiz sebenar",
  pageFit: "Satu mukasurat penuh",
  pageWidth: "Sesuai dengan lebar halaman"
};
const sort = {
  addTime: "tambah masa",
  asc: "Susunan menaik",
  desc: "dalam susunan menurun",
  readProgress: "kemajuan membaca",
  readTime: "Waktu membaca",
  updateTime: "Baru-baru ini dibaca"
};
const ms = {
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
  ms as default,
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
