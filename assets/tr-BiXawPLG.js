const menu = {
  book: "kitabın",
  note: "notlar",
  setting: "kurmak",
  recycleBin: "geridönüşüm kutusu"
};
const setting = {
  chooseLanguage: "Bir dil seçin",
  chooseTheme: "Tema seçin",
  language: "dil",
  theme: "tema",
  userSetting: "Kullanıcı ayarları",
  autoHighlightDesc: "Açıldıktan sonra metin seçildiğinde otomatik olarak vurgulanacaktır.",
  autoHighlightTitle: "Otomatik olarak vurgulanıp vurgulanmayacağı",
  bookMode: "kitaplık modu",
  mode: "modeli",
  noteShowClassDesc: "Kapattıktan sonra, vurgulama stili yalnızca fare bunun üzerine kaydırıldığında görüntülenecektir.",
  noteShowClassTitle: "Notların vurgu stilini gösterip göstermediği",
  openNewDesc: "Aksi takdirde okuyucu yalnızca geçerli sayfada olacaktır.",
  openNewTitle: "Okuyucunun yeni bir sayfa açıp açmaması",
  openRecycleBinDesc: "Geri Dönüşüm Kutusu'nu kapatın Bir kitabı sildiğinizde, kitap Geri Dönüşüm Kutusu'na taşınmak yerine kalıcı olarak silinir.",
  openRecycleBinTitle: "Geri dönüşüm kutusu işlevini açın",
  readMode: "okuma modu",
  rememberPositionDesc: "Açtıktan sonra okuma arayüzüne tekrar girildiğinde otomatik olarak son okuma pozisyonuna atlanacaktır.",
  rememberPositionTitle: "Son okuma konumunun hatırlanıp hatırlanmayacağı",
  autoHighlight: "Otomatik vurgulama"
};
const unfound = {
  desc: "Üzgünüz, sayfayı bulamıyoruz. \nAna sayfada keşfedecek çok şey bulacaksınız.",
  tip: "ana sayfaya dön",
  title: "Sayfa eksik"
};
const file = {
  upload: "dosyaları yükle",
  choose: "Bir belge seçin",
  dragFile: "Dosyaları buraya sürükleyip bırakın",
  exist: "dosya zaten mevcut",
  releaseMouse: "Fareyi bırakın",
  uploadSuccess: "yükleme başarılı",
  supportFormat: "Desteklenen formatlar:"
};
const common = {
  or: "veya",
  addBookshelf: "Kitaplık ekle",
  addLove: "favorilerini ekle",
  detail: "Detaylar",
  edit: "düzenlemek",
  forceRemove: "kalıcı olarak sil",
  remove: "silmek",
  removeLove: "Favorileri kaldır",
  restore: "iyileşmek",
  score: "Gol",
  unknown: "Bilinmeyen",
  close: "kapanış",
  copySuccess: "Başarıyla kopyalandı",
  cancel: "İptal etmek",
  sure: "onaylamak",
  minute: "nokta",
  addSuccess: "Başarıyla eklendi",
  empty: "Boş",
  removeSuccess: "Başarıyla kaldırıldı",
  removeFail: "silinemedi",
  restoreFail: "Geri yükleme başarısız oldu",
  editFail: "Düzenleme başarısız oldu",
  updateFail: "Güncelleme başarısız oldu",
  add: "a ekle",
  copy: "kopyala",
  prewView: "Önceki sayfa",
  getFirstView: "Zaten ilk sayfa",
  getLastView: "Zaten son sayfa",
  nextView: "Sonraki Sayfa",
  comeFrom: "itibaren"
};
const readMode = {
  double: "Çift sayfa modu",
  scroll: "kaydırma modu",
  section: "Bölüm modu"
};
const bookMode = {
  bookshelf: "kitaplık modu",
  card: "kart modu",
  list: "liste modu"
};
const book = {
  author: "yazar",
  bookshelf: "kitaplık",
  createTime: "zaman yarat",
  detail: "Kitap ayrıntıları",
  highlightLen: "Öne çıkanların sayısı",
  name: "kitap başlığı",
  notesLen: "Not sayısı",
  openCount: "kaç kez okundu",
  page: "Sayfa sayısı",
  publishTime: "Yayınlanma tarihi",
  publisher: "Yayımcı",
  readProgress: "okuma ilerlemesi",
  score: "Gol",
  size: "boyut",
  totalReadTime: "Toplam okuma süresi",
  updateTime: "Güncelleme zamanı",
  readDetailFail: "Kitap ayrıntıları okunamadı",
  thisReadTime: "Bu okuma zamanı",
  addToBookshelfFail: "Kitap rafına eklenemedi",
  addToBookshelfSuccess: "Kitap rafına başarıyla eklendi",
  addToBookshelf: "Kitap rafına ekle",
  getBookshelfFail: "Kitaplık alınamadı",
  neeSelectBookshelf: "Lütfen kitaplık seçin",
  needBookshelfName: "Lütfen kitap rafının adını girin",
  cover: "kitap kapağı",
  needAuhor: "Lütfen yazar adını girin",
  needBookName: "Lütfen kitabın adını girin",
  uploadCover: "Kapağı yükle",
  uploadCoverFial: "Kapak yüklenemedi",
  forceRemove: "Bu kitabı kalıcı olarak sil",
  moveToRecycleBin: "Bu kitabı çöp kutusuna taşıyın",
  removeBook: "kitabı sil",
  empty: "Kitap listesi boş",
  needScore: "Lütfen derecelendirmeyi girin",
  recycleNoRecord: "Geri Dönüşüm Kutusu'nda silinen verilerin kaydı yok!",
  uploadBookTip: "Bir kitabı yerel olarak yüklemek için yükle düğmesine tıklayın ve ardından kendinizi kitap denizine kaptırmaya başlayın!",
  getBookFail: "Kitap alınamadı",
  getBookListFail: "Kitap listesi okunamadı",
  getBookReadTimeFail: "Kitap okuma süresi listesi okunamadı",
  getBookReadTimeListFail: "Kitap okuma süresi listesi okunamadı",
  importBookFail: "Kitaplar içe aktarılamadı",
  recordBookTimeFail: "Okuma süresi kaydedilemedi",
  needAuthor: "Lütfen yazar adını girin",
  uploadCoverFail: "Kapak yüklenemedi",
  jumpToBookList: "Kitap listesine atla",
  jumpToLastPosition: "Son okuma konumuna atla"
};
const note = {
  addNoteFail: "Not eklenemedi",
  getNoteFail: "Not listesi okunamadı",
  getNoteListFail: "Not listesi okunamadı",
  empty: "Not listesi boş",
  emptyNoteListTip: "Kitap listesi arayüzünüzde okumak için bir kitap seçin, ardından dikkatinizi çeken metni seçin ve açılan iletişim kutusuna düşüncelerinizi girin",
  forceRemove: "Bu notu kalıcı olarak sil",
  noteDetail: "Not ayrıntıları",
  removeSuccess: "Not başarıyla silindi",
  sureRemove: "Not silme işlemini onaylayın",
  placeholder: "Bu sefer düşüncelerinizi yazın...",
  write: "fikir yaz",
  myNote: "notlarım",
  findNoteError: "Veri kaybı: Not yerel olarak bulunamadı",
  writeYouNore: "Lütfen not içeriğini girin"
};
const tag = {
  needTag: "Lütfen etiketi girin",
  removeTagSuccess: "Etiket başarıyla silindi",
  name: "Etiket"
};
const statistics = {
  bookUnit: "Kitap",
  noteUnit: "Bölüm",
  readTime: "süre",
  readTimeUnit: "Saat",
  readTotalTime: "toplam süre",
  readed: "Okudum",
  reading: "okuma",
  thisMouthNote: "Bu ay için notlar",
  thisMouthReadTime: "Bu ayın süresi",
  thisMouthReaded: "Bu ay okuyun",
  thisMouthReading: "Bu ay okuyorum",
  total: "Toplam tutar",
  myLove: "benim favorim",
  currentReading: "Son zamanlarda okuyorum"
};
const line = {
  beeline: "düz",
  marker: "işaretleyici",
  wavy: "dalgalı çizgiler"
};
const pdf = {
  auto: "Otomatik ölçeklendirme",
  pageActual: "gerçek boyutu",
  pageFit: "sayfaya sığdır",
  pageWidth: "Sayfa genişliğine sığdır"
};
const sort = {
  addTime: "Zaman ekle",
  asc: "Artan düzen",
  desc: "azalan sipariş",
  readProgress: "okuma ilerlemesi",
  readTime: "Okuma zamanı",
  updateTime: "Son zamanlarda okundu"
};
const tr = {
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
  tr as default,
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
