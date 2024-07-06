const menu = {
  book: "bøker",
  note: "notater",
  setting: "sette opp",
  recycleBin: "papirkurven"
};
const setting = {
  chooseLanguage: "Velg et språk",
  chooseTheme: "Velg tema",
  language: "Språk",
  theme: "tema",
  userSetting: "brukerinstillinger",
  autoHighlightDesc: "Etter åpning, når tekst er valgt, vil den automatisk utheves.",
  autoHighlightTitle: "Om det skal fremheves automatisk",
  bookMode: "bokhyllemodus",
  mode: "modell",
  noteShowClassDesc: "Etter lukking vil fremhevingsstilen bare vises når musen glir over den.",
  noteShowClassTitle: "Om notater viser fremhevingsstil",
  openNewDesc: "Hvis ikke, vil leseren kun være på den gjeldende siden.",
  openNewTitle: "Om leseren åpner en ny side",
  openRecycleBinDesc: "Lukk papirkurven Når du sletter en bok, slettes den permanent i stedet for å bli flyttet til papirkurven.",
  openRecycleBinTitle: "Slå på papirkurvfunksjonen",
  readMode: "lesemodus",
  rememberPositionDesc: "Etter å ha åpnet den, vil en gang til lesegrensesnittet igjen hoppe til siste leseposisjon.",
  rememberPositionTitle: "Om du skal huske siste lesestilling",
  autoHighlight: "Automatisk utheving"
};
const unfound = {
  desc: "Beklager, vi finner ikke siden. \nDu finner mye å utforske på hjemmesiden.",
  tip: "tilbake til hjemmesiden",
  title: "Siden mangler"
};
const file = {
  upload: "Last opp filer",
  choose: "Velg et dokument",
  dragFile: "Dra og slipp filer her",
  exist: "Filen finnes allerede",
  releaseMouse: "Slipp musen",
  uploadSuccess: "Opplastingen var vellykket",
  supportFormat: "Støttede formater:"
};
const common = {
  or: "eller",
  addBookshelf: "Legg til bokhylle",
  addLove: "legg til favoritter",
  detail: "Detaljer",
  edit: "redigere",
  forceRemove: "slette permanent",
  remove: "slette",
  removeLove: "Fjern favoritter",
  restore: "gjenopprette",
  score: "score",
  unknown: "ukjent",
  close: "stenging",
  copySuccess: "Kopiert vellykket",
  cancel: "Avbryt",
  sure: "bekrefte",
  minute: "punkt",
  addSuccess: "Lagt til",
  empty: "Tømme",
  removeSuccess: "Fjernet vellykket",
  removeFail: "mislyktes i å slette",
  restoreFail: "Gjenoppretting mislyktes",
  editFail: "Redigering mislyktes",
  updateFail: "Oppdatering mislyktes",
  add: "Legge til",
  copy: "kopiere",
  prewView: "Forrige side",
  getFirstView: "Allerede første side",
  getLastView: "Allerede siste side",
  nextView: "Neste side",
  comeFrom: "fra"
};
const readMode = {
  double: "Dobbeltsidemodus",
  scroll: "rullemodus",
  section: "Kapittelmodus"
};
const bookMode = {
  bookshelf: "bokhyllemodus",
  card: "kortmodus",
  list: "listemodus"
};
const book = {
  author: "forfatter",
  bookshelf: "bokhylle",
  createTime: "skape tid",
  detail: "Bokdetaljer",
  highlightLen: "Antall høydepunkter",
  name: "boktittel",
  notesLen: "Antall notater",
  openCount: "antall leste ganger",
  page: "Antall sider",
  publishTime: "Publiseringsdato",
  publisher: "Forlegger",
  readProgress: "lesefremgang",
  score: "score",
  size: "størrelse",
  totalReadTime: "Total lesetid",
  updateTime: "Oppdater tid",
  readDetailFail: "Kunne ikke lese bokdetaljer",
  thisReadTime: "Denne lesetiden",
  addToBookshelfFail: "Kunne ikke legge til i bokhyllen",
  addToBookshelfSuccess: "Lagt til i bokhyllen",
  addToBookshelf: "Legg til bokhylle",
  getBookshelfFail: "Kunne ikke hente bokhylle",
  neeSelectBookshelf: "Velg bokhylle",
  needBookshelfName: "Vennligst skriv inn bokhyllenavnet",
  cover: "bokomslag",
  needAuhor: "Vennligst skriv inn forfatternavn",
  needBookName: "Skriv inn boktittelen",
  uploadCover: "Last opp omslag",
  uploadCoverFial: "Kunne ikke laste opp omslaget",
  forceRemove: "Slett denne boken permanent",
  moveToRecycleBin: "Flytt denne boken til papirkurven",
  removeBook: "slette boken",
  empty: "Boklisten er tom",
  needScore: "Vennligst skriv inn vurdering",
  recycleNoRecord: "Det er ingen registrering av slettede data i papirkurven!",
  uploadBookTip: "Klikk på opplastingsknappen for å laste opp en bok lokalt, og begynn å fordype deg i havet av bøker!",
  getBookFail: "Kunne ikke hente boken",
  getBookListFail: "Kunne ikke lese boklisten",
  getBookReadTimeFail: "Kunne ikke lese bokens lesetidsliste",
  getBookReadTimeListFail: "Kunne ikke lese bokens lesetidsliste",
  importBookFail: "Kunne ikke importere bøker",
  recordBookTimeFail: "Kunne ikke registrere lesetiden",
  needAuthor: "Vennligst skriv inn forfatternavn",
  uploadCoverFail: "Kunne ikke laste opp omslaget",
  jumpToBookList: "Gå til boklisten",
  jumpToLastPosition: "Hopp til siste leseposisjon"
};
const note = {
  addNoteFail: "Kunne ikke legge til notatet",
  getNoteFail: "Kunne ikke lese notatlisten",
  getNoteListFail: "Kunne ikke lese notatlisten",
  empty: "Notatlisten er tom",
  emptyNoteListTip: "I grensesnittet for boklisten, velg en bok du vil lese, velg teksten som tiltrekker deg oppmerksomhet, og skriv inn tankene dine i popup-dialogboksen",
  forceRemove: "Slett dette notatet permanent",
  noteDetail: "Legg merke til detaljer",
  removeSuccess: "Notatet ble slettet",
  sureRemove: "Bekreft sletting av notat",
  placeholder: "Skriv ned tankene dine nå...",
  write: "skrive ideer",
  myNote: "mine notater"
};
const tag = {
  needTag: "Vennligst skriv inn tag",
  removeTagSuccess: "Taggen er slettet"
};
const statistics = {
  bookUnit: "Bok",
  noteUnit: "Kapittel",
  readTime: "varighet",
  readTimeUnit: "Time",
  readTotalTime: "total varighet",
  readed: "Har lest",
  reading: "lesning",
  thisMouthNote: "Notater for denne måneden",
  thisMouthReadTime: "Varighet denne måneden",
  thisMouthReaded: "Les denne måneden",
  thisMouthReading: "Leser denne måneden",
  total: "Totalbeløpet",
  myLove: "min favoritt",
  currentReading: "Har lest nylig"
};
const line = {
  beeline: "rett linje",
  marker: "markør",
  wavy: "bølgete linjer"
};
const pdf = {
  auto: "Automatisk skalering",
  pageActual: "Faktisk størrelse",
  pageFit: "passer til side",
  pageWidth: "Tilpass til sidebredde"
};
const no = {
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
  no as default,
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
