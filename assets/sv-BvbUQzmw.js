const menu = {
  book: "böcker",
  note: "anteckningar",
  setting: "uppstart",
  recycleBin: "papperskorgen"
};
const setting = {
  chooseLanguage: "Välj ett språk",
  chooseTheme: "Välj tema",
  language: "språk",
  theme: "tema",
  userSetting: "användarinställningar",
  autoHighlightDesc: "Efter öppning, när text är markerad, kommer den att markeras automatiskt.",
  autoHighlightTitle: "Om automatiskt markeras",
  bookMode: "bokhylla läge",
  mode: "modell",
  noteShowClassDesc: "Efter stängning kommer markeringsstilen endast att visas när musen glider över den.",
  noteShowClassTitle: "Huruvida anteckningar visar markeringsstil",
  openNewDesc: "Om inte, kommer läsaren bara att finnas på den aktuella sidan.",
  openNewTitle: "Om läsaren öppnar en ny sida",
  openRecycleBinDesc: "Stäng papperskorgen När du tar bort en bok raderas den permanent istället för att flyttas till papperskorgen.",
  openRecycleBinTitle: "Slå på papperskorgen",
  readMode: "läsläge",
  rememberPositionDesc: "Efter att ha öppnat den, kommer att gå in i läsgränssnittet igen och automatiskt hoppa till den sista läspositionen.",
  rememberPositionTitle: "Om man ska komma ihåg den senaste läspositionen",
  autoHighlight: "Automatisk markering"
};
const unfound = {
  desc: "Tyvärr, vi kan inte hitta sidan. \nDu hittar mycket att utforska på hemsidan.",
  tip: "tillbaka till startsidan",
  title: "Sidan saknas"
};
const file = {
  upload: "ladda upp filer",
  choose: "Välj ett dokument",
  dragFile: "Dra och släpp filer här",
  exist: "filen finns redan",
  releaseMouse: "Släpp musen",
  uploadSuccess: "Uppladdningen lyckades",
  supportFormat: "Format som stöds:"
};
const common = {
  or: "eller",
  addBookshelf: "Lägg till bokhylla",
  addLove: "lägg till favoriter",
  detail: "Detaljer",
  edit: "redigera",
  forceRemove: "ta bort permanent",
  remove: "radera",
  removeLove: "Ta bort favoriter",
  restore: "ta igen sig",
  score: "Göra",
  unknown: "okänd",
  close: "stängning",
  copySuccess: "Kopierades framgångsrikt",
  cancel: "Annullera",
  sure: "bekräfta",
  minute: "punkt",
  addSuccess: "Tillagd framgångsrikt",
  empty: "Tömma",
  removeSuccess: "Har tagits bort",
  removeFail: "misslyckades att radera",
  restoreFail: "Återställningen misslyckades",
  editFail: "Redigeringen misslyckades",
  updateFail: "Uppdateringen misslyckades",
  add: "Lägg till",
  copy: "kopiera"
};
const readMode = {
  double: "Dubbelsidigt läge",
  scroll: "rullningsläge",
  section: "Kapitelläge"
};
const bookMode = {
  bookshelf: "bokhylla läge",
  card: "kortläge",
  list: "listläge"
};
const book = {
  author: "författare",
  bookshelf: "bokhylla",
  createTime: "skapa tid",
  detail: "Bokdetaljer",
  highlightLen: "Antal höjdpunkter",
  name: "boktitel",
  notesLen: "Antal anteckningar",
  openCount: "antal gånger läst",
  page: "Antal sidor",
  publishTime: "Publiceringsdatum",
  publisher: "Utgivare",
  readProgress: "läsframsteg",
  score: "Göra",
  size: "storlek",
  totalReadTime: "Total lästid",
  updateTime: "Uppdaterings tid",
  readDetailFail: "Det gick inte att läsa bokinformationen",
  thisReadTime: "Den här lästiden",
  addToBookshelfFail: "Det gick inte att lägga till i bokhyllan",
  addToBookshelfSuccess: "Lades till i bokhyllan",
  addToBookshelf: "Lägg till i bokhyllan",
  getBookshelfFail: "Det gick inte att hämta bokhyllan",
  neeSelectBookshelf: "Välj bokhylla",
  needBookshelfName: "Vänligen ange bokhyllans namn",
  cover: "bokomslag",
  needAuhor: "Ange författarens namn",
  needBookName: "Ange bokens titel",
  uploadCover: "Ladda upp omslag",
  uploadCoverFial: "Det gick inte att ladda upp omslaget",
  forceRemove: "Ta bort den här boken permanent",
  moveToRecycleBin: "Flytta den här boken till papperskorgen",
  removeBook: "radera bok",
  empty: "Boklistan är tom",
  needScore: "Vänligen ange betyg",
  recycleNoRecord: "Det finns ingen registrering av raderade data i papperskorgen!",
  uploadBookTip: "Klicka på uppladdningsknappen för att ladda upp en bok lokalt och börja sedan fördjupa dig i havet av böcker!",
  getBookFail: "Det gick inte att hämta boken",
  getBookListFail: "Det gick inte att läsa boklistan",
  getBookReadTimeFail: "Det gick inte att läsa bokens tidslista",
  getBookReadTimeListFail: "Det gick inte att läsa bokens tidslista",
  importBookFail: "Det gick inte att importera böcker",
  recordBookTimeFail: "Det gick inte att registrera lästiden",
  needAuthor: "Ange författarens namn",
  uploadCoverFail: "Det gick inte att ladda upp omslaget",
  jumpToBookList: "Hoppa till boklistan",
  jumpToLastPosition: "Hoppa till sista läsposition"
};
const note = {
  addNoteFail: "Det gick inte att lägga till anteckning",
  getNoteFail: "Det gick inte att läsa anteckningslistan",
  getNoteListFail: "Det gick inte att läsa anteckningslistan",
  empty: "Anteckningslistan är tom",
  emptyNoteListTip: "I boklistans gränssnitt väljer du en bok att läsa, markerar sedan texten som lockar din uppmärksamhet och skriv dina tankar i popup-dialogrutan",
  forceRemove: "Ta bort denna anteckning permanent",
  noteDetail: "Notera detaljer",
  removeSuccess: "Anteckningen har raderats",
  sureRemove: "Bekräfta radering av anteckning",
  placeholder: "Skriv ner dina tankar just nu...",
  write: "skriva idéer"
};
const tag = {
  needTag: "Vänligen ange tagg",
  removeTagSuccess: "Taggen har tagits bort"
};
const statistics = {
  bookUnit: "bok",
  noteUnit: "Kapitel",
  readTime: "varaktighet",
  readTimeUnit: "Timme",
  readTotalTime: "Total varaktighet",
  readed: "Har läst",
  reading: "läsning",
  thisMouthNote: "Anteckningar för denna månad",
  thisMouthReadTime: "Längd denna månad",
  thisMouthReaded: "Läs denna månad",
  thisMouthReading: "Läser denna månad",
  total: "Den totala summan",
  myLove: "min favorit",
  currentReading: "Läste nyligen"
};
const line = {
  beeline: "rak linje",
  marker: "markör",
  wavy: "vågiga linjer"
};
const pdf = {
  auto: "Automatisk skalning",
  pageActual: "faktiska storleken",
  pageFit: "anpassa till sida",
  pageWidth: "Anpassa till sidans bredd"
};
const sv = {
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
  sv as default,
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
