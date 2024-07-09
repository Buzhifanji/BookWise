const menu = {
  book: "buku",
  note: "Catatan",
  setting: "Pengaturan",
  recycleBin: "tempat sampah"
};
const setting = {
  chooseLanguage: "Pilih bahasa",
  chooseTheme: "Pilih tema",
  language: "bahasa",
  theme: "tema",
  userSetting: "pengaturan pengguna",
  autoHighlightDesc: "Setelah dibuka, ketika teks dipilih, teks tersebut akan disorot secara otomatis.",
  autoHighlightTitle: "Apakah akan menyorot secara otomatis",
  bookMode: "mode rak buku",
  mode: "model",
  noteShowClassDesc: "Setelah ditutup, gaya highlight hanya akan ditampilkan ketika mouse menggesernya.",
  noteShowClassTitle: "Apakah catatan menampilkan gaya sorotan",
  openNewDesc: "Jika tidak, pembaca hanya akan berada di halaman saat ini.",
  openNewTitle: "Apakah pembaca membuka halaman baru",
  openRecycleBinDesc: "Tutup Recycle Bin. Saat Anda menghapus buku, buku tersebut akan terhapus secara permanen dan bukannya dipindahkan ke Recycle Bin.",
  openRecycleBinTitle: "Aktifkan fungsi recycle bin",
  readMode: "modus membaca",
  rememberPositionDesc: "Setelah dibuka, masuk kembali ke antarmuka membaca akan otomatis melompat ke posisi membaca terakhir.",
  rememberPositionTitle: "Apakah akan mengingat posisi membaca terakhir",
  autoHighlight: "Sorotan otomatis"
};
const unfound = {
  desc: "Maaf, kami tidak dapat menemukan halamannya. \nAnda akan menemukan banyak hal untuk dijelajahi di beranda.",
  tip: "kembali ke beranda",
  title: "Halamannya hilang"
};
const file = {
  upload: "unggah berkas",
  choose: "Pilih dokumen",
  dragFile: "Seret dan letakkan file di sini",
  exist: "Berkas sudah ada",
  releaseMouse: "Lepaskan tikus",
  uploadSuccess: "Unggahan berhasil",
  supportFormat: "Format yang didukung:"
};
const common = {
  or: "atau",
  addBookshelf: "Tambahkan rak buku",
  addLove: "tambahkan favorit",
  detail: "Detail",
  edit: "sunting",
  forceRemove: "hapus secara permanen",
  remove: "menghapus",
  removeLove: "Hapus favorit",
  restore: "pulih",
  score: "skor",
  unknown: "tidak dikenal",
  close: "penutup",
  copySuccess: "Berhasil disalin",
  cancel: "Membatalkan",
  sure: "mengonfirmasi",
  minute: "titik",
  addSuccess: "Berhasil ditambahkan",
  empty: "Kosong",
  removeSuccess: "Berhasil dihapus",
  removeFail: "gagal dihapus",
  restoreFail: "Pemulihan gagal",
  editFail: "Pengeditan gagal",
  updateFail: "Pembaharuan gagal",
  add: "Tambahkan",
  copy: "menyalin",
  prewView: "Halaman sebelumnya",
  getFirstView: "Sudah halaman pertama",
  getLastView: "Sudah halaman terakhir",
  nextView: "Halaman selanjutnya",
  comeFrom: "dari",
  action: "beroperasi",
  rename: "Ganti nama"
};
const readMode = {
  double: "Mode halaman ganda",
  scroll: "mode gulir",
  section: "Modus bab"
};
const bookMode = {
  bookshelf: "mode rak buku",
  card: "modus kartu",
  list: "modus daftar"
};
const book = {
  author: "pengarang",
  bookshelf: "rak buku",
  createTime: "buatWaktu",
  detail: "Detail buku",
  highlightLen: "Jumlah sorotan",
  name: "Judul buku",
  notesLen: "Jumlah catatan",
  openCount: "berapa kali dibaca",
  page: "Jumlah halaman",
  publishTime: "Tanggal publikasi",
  publisher: "Penerbit",
  readProgress: "kemajuan membaca",
  score: "skor",
  size: "ukuran",
  totalReadTime: "Total waktu membaca",
  updateTime: "Perbarui waktu",
  readDetailFail: "Gagal membaca detail buku",
  thisReadTime: "Waktu membaca ini",
  addToBookshelfFail: "Gagal menambahkan ke rak buku",
  addToBookshelfSuccess: "Berhasil ditambahkan ke rak buku",
  addToBookshelf: "Tambahkan ke rak buku",
  getBookshelfFail: "Gagal mendapatkan rak buku",
  neeSelectBookshelf: "Silakan pilih rak buku",
  needBookshelfName: "Silakan masukkan nama rak buku",
  cover: "sampul buku",
  needAuhor: "Silakan masukkan nama penulis",
  needBookName: "Silakan masukkan judul buku",
  uploadCover: "Unggah sampul",
  uploadCoverFial: "Gagal mengunggah sampul",
  forceRemove: "Hapus buku ini secara permanen",
  moveToRecycleBin: "Pindahkan buku ini ke tempat sampah",
  removeBook: "menghapus buku",
  empty: "Daftar buku kosong",
  needScore: "Silakan masukkan peringkat",
  recycleNoRecord: "Tidak ada catatan data yang terhapus di Recycle Bin!",
  uploadBookTip: "Klik tombol unggah untuk mengunggah buku secara lokal, lalu mulailah menyelami lautan buku!",
  getBookFail: "Gagal mendapatkan buku",
  getBookListFail: "Gagal membaca daftar buku",
  getBookReadTimeFail: "Gagal membaca daftar waktu membaca buku",
  getBookReadTimeListFail: "Gagal membaca daftar waktu membaca buku",
  importBookFail: "Gagal mengimpor buku",
  recordBookTimeFail: "Gagal mencatat waktu membaca",
  needAuthor: "Silakan masukkan nama penulis",
  uploadCoverFail: "Gagal mengunggah sampul",
  jumpToBookList: "Lompat ke daftar buku",
  jumpToLastPosition: "Lompat ke posisi membaca terakhir",
  bookNumber: "Jumlah buku",
  bookshelfManage: "Kelola rak buku",
  bookshelfTitle: "nama rak buku",
  clearEmptyBookshelf: "Kosongkan rak buku kosong dengan satu klik",
  removeBookshelfSuccess: "Rak buku berhasil dihapus",
  removeBookshelftSuccess: "Rak buku berhasil dihapus",
  renameFail: "Gagal mengganti nama rak buku"
};
const note = {
  addNoteFail: "Gagal menambahkan catatan",
  getNoteFail: "Gagal membaca daftar catatan",
  getNoteListFail: "Gagal membaca daftar catatan",
  empty: "Daftar catatan kosong",
  emptyNoteListTip: "Di antarmuka daftar buku Anda, pilih buku untuk dibaca, lalu pilih teks yang menarik perhatian Anda, dan masukkan pemikiran Anda di kotak dialog pop-up",
  forceRemove: "Hapus catatan ini secara permanen",
  noteDetail: "Detail catatan",
  removeSuccess: "Catatan berhasil dihapus",
  sureRemove: "Konfirmasikan penghapusan catatan",
  placeholder: "Tuliskan pemikiran Anda saat ini...",
  write: "menulis ide",
  myNote: "catatan Saya",
  findNoteError: "Kehilangan data: Catatan tidak ditemukan secara lokal",
  writeYouNore: "Silakan masukkan isi catatan",
  mode: "modus catatan",
  noteNumber: "Jumlah catatan"
};
const tag = {
  needTag: "Silakan masukkan tag",
  removeTagSuccess: "Tag berhasil dihapus",
  name: "Label",
  clearEmptyTag: "Hapus tag kosong dengan satu klik",
  getTagListFail: "Gagal mendapatkan daftar rak buku",
  manage: "manajemen tag",
  renameFail: "Gagal mengganti nama rak buku:",
  tagTitle: "nama tag"
};
const statistics = {
  bookUnit: "Buku",
  noteUnit: "Bab",
  readTime: "durasi",
  readTimeUnit: "Jam",
  readTotalTime: "durasi total",
  readed: "Telah membaca",
  reading: "membaca",
  thisMouthNote: "Catatan untuk bulan ini",
  thisMouthReadTime: "Durasi bulan ini",
  thisMouthReaded: "Baca bulan ini",
  thisMouthReading: "Membaca bulan ini",
  total: "Jumlah total",
  myLove: "kesukaan saya",
  currentReading: "Membaca baru-baru ini"
};
const line = {
  beeline: "garis lurus",
  marker: "penanda",
  wavy: "garis bergelombang"
};
const pdf = {
  auto: "Penskalaan otomatis",
  pageActual: "ukuran sebenarnya",
  pageFit: "sesuai dengan halaman",
  pageWidth: "Sesuaikan dengan lebar halaman"
};
const sort = {
  addTime: "tambahkan waktu",
  asc: "Urutan menaik",
  desc: "urutan menurun",
  readProgress: "kemajuan membaca",
  readTime: "Waktu membaca",
  updateTime: "Baru-baru ini dibaca"
};
const id = {
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
  id as default,
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
