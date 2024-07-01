const menu = {
  book: "boeken",
  note: "notities",
  setting: "opgericht",
  recycleBin: "prullenbak"
};
const setting = {
  chooseLanguage: "Kies een taal",
  chooseTheme: "Selecteer thema",
  language: "taal",
  theme: "thema",
  userSetting: "gebruikersinstellingen",
  autoHighlightDesc: "Wanneer na het openen tekst wordt geselecteerd, wordt deze automatisch gemarkeerd.",
  autoHighlightTitle: "Of automatisch moet worden gemarkeerd",
  bookMode: "boekenplankmodus",
  mode: "model",
  noteShowClassDesc: "Na het sluiten wordt de markeringsstijl alleen weergegeven als de muis erover beweegt.",
  noteShowClassTitle: "Of notities de markeringsstijl weergeven",
  openNewDesc: "Als dit niet het geval is, bevindt de lezer zich alleen op de huidige pagina.",
  openNewTitle: "Of de lezer een nieuwe pagina opent",
  openRecycleBinDesc: "Sluit de Prullenbak Wanneer u een boek verwijdert, wordt het permanent verwijderd in plaats van dat het naar de Prullenbak wordt verplaatst.",
  openRecycleBinTitle: "Schakel de prullenbakfunctie in",
  readMode: "leesmodus",
  rememberPositionDesc: "Na het openen springt het opnieuw openen van de leesinterface automatisch naar de laatste leespositie.",
  rememberPositionTitle: "Of u de laatste leespositie wilt onthouden",
  autoHighlight: "Automatisch markeren"
};
const unfound = {
  desc: "Sorry, we kunnen de pagina niet vinden. \nOp de startpagina valt veel te ontdekken.",
  tip: "terug naar de startpagina",
  title: "De pagina ontbreekt"
};
const file = {
  upload: "upload bestanden",
  choose: "Selecteer een document",
  dragFile: "Sleep bestanden hierheen",
  exist: "Bestand bestaat al",
  releaseMouse: "Laat de muis los",
  uploadSuccess: "succesvol geupload",
  supportFormat: "Ondersteunde formaten:"
};
const common = {
  or: "of",
  addBookshelf: "Boekenplank toevoegen",
  addLove: "favorieten toevoegen",
  detail: "Details",
  edit: "bewerking",
  forceRemove: "permanent verwijderen",
  remove: "verwijderen",
  removeLove: "Favorieten verwijderen",
  restore: "herstellen",
  score: "scoren",
  unknown: "onbekend",
  close: "sluiting",
  copySuccess: "Gekopieerd",
  cancel: "Annuleren",
  sure: "bevestigen",
  minute: "punt",
  addSuccess: "Succesvol toegevoegd",
  empty: "Leeg",
  removeSuccess: "Succesvol verwijderd",
  removeFail: "kan niet worden verwijderd",
  restoreFail: "Herstellen mislukt",
  editFail: "Bewerken mislukt",
  updateFail: "Update mislukt",
  add: "Optellen bij",
  copy: "kopiëren"
};
const readMode = {
  double: "Dubbele paginamodus",
  scroll: "scroll-modus",
  section: "Hoofdstukmodus"
};
const bookMode = {
  bookshelf: "boekenplankmodus",
  card: "kaartmodus",
  list: "lijstmodus"
};
const book = {
  author: "auteur",
  bookshelf: "boekenplank",
  createTime: "Maak tijd",
  detail: "Boekdetails",
  highlightLen: "Aantal hoogtepunten",
  name: "boek titel",
  notesLen: "Aantal notities",
  openCount: "aantal keren gelezen",
  page: "Aantal pagina's",
  publishTime: "Datum van het uitbrengen",
  publisher: "Uitgever",
  readProgress: "voortgang lezen",
  score: "scoren",
  size: "maat",
  totalReadTime: "Totale leestijd",
  updateTime: "Update tijd",
  readDetailFail: "Kan boekdetails niet lezen",
  thisReadTime: "Deze leestijd",
  addToBookshelfFail: "Toevoegen aan boekenplank mislukt",
  addToBookshelfSuccess: "Succesvol toegevoegd aan de boekenplank",
  addToBookshelf: "Toevoegen aan boekenplank",
  getBookshelfFail: "Kan de boekenplank niet ophalen",
  neeSelectBookshelf: "Selecteer boekenplank",
  needBookshelfName: "Voer de naam van de boekenplank in",
  cover: "boekomslag",
  needAuhor: "Voer de naam van de auteur in",
  needBookName: "Voer de titel van het boek in",
  uploadCover: "Omslag uploaden",
  uploadCoverFial: "Kan de omslag niet uploaden",
  forceRemove: "Verwijder dit boek definitief",
  moveToRecycleBin: "Verplaats dit boek naar de prullenbak",
  removeBook: "boek verwijderen",
  empty: "Boekenlijst is leeg",
  needScore: "Voer een beoordeling in",
  recycleNoRecord: "Er is geen record van verwijderde gegevens in de Prullenbak!",
  uploadBookTip: "Klik op de uploadknop om lokaal een boek te uploaden en dompel jezelf vervolgens onder in de zee van boeken!",
  getBookFail: "Het is niet gelukt om het boek op te halen",
  getBookListFail: "Kan de boekenlijst niet lezen",
  getBookReadTimeFail: "Kan de leestijdlijst van het boek niet lezen",
  getBookReadTimeListFail: "Kan de leestijdlijst van het boek niet lezen",
  importBookFail: "Kan boeken niet importeren",
  recordBookTimeFail: "Kan leestijd niet registreren",
  needAuthor: "Voer de naam van de auteur in",
  uploadCoverFail: "Kan de omslag niet uploaden",
  jumpToBookList: "Ga naar de boekenlijst",
  jumpToLastPosition: "Spring naar de laatste leespositie"
};
const note = {
  addNoteFail: "Kan notitie niet toevoegen",
  getNoteFail: "Kan de notitielijst niet lezen",
  getNoteListFail: "Kan de notitielijst niet lezen",
  empty: "Notitielijst is leeg",
  emptyNoteListTip: "Selecteer in de interface van uw boekenlijst een boek dat u wilt lezen, selecteer vervolgens de tekst die uw aandacht trekt en voer uw gedachten in het pop-upvenster in",
  forceRemove: "Verwijder deze notitie definitief",
  noteDetail: "Let op details",
  removeSuccess: "Opmerking succesvol verwijderd",
  sureRemove: "Bevestig het verwijderen van de notitie",
  placeholder: "Schrijf uw gedachten op dit moment op...",
  write: "schrijf ideeën"
};
const tag = {
  needTag: "Voer een tag in",
  removeTagSuccess: "Tag succesvol verwijderd"
};
const statistics = {
  bookUnit: "Boek",
  noteUnit: "Hoofdstuk",
  readTime: "duur",
  readTimeUnit: "Uur",
  readTotalTime: "totale duur",
  readed: "Heb gelezen",
  reading: "lezing",
  thisMouthNote: "Opmerkingen voor deze maand",
  thisMouthReadTime: "Duur van deze maand",
  thisMouthReaded: "Lees deze maand",
  thisMouthReading: "Deze maand lezen",
  total: "De totale hoeveelheid",
  myLove: "mijn favoriet",
  currentReading: "Recent gelezen"
};
const line = {
  beeline: "rechte lijn",
  marker: "markeerstift",
  wavy: "golvende lijnen"
};
const pdf = {
  auto: "Automatisch schalen",
  pageActual: "daadwerkelijke grootte",
  pageFit: "aanpassen aan pagina",
  pageWidth: "Aanpassen aan paginabreedte"
};
const nl = {
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
  nl as default,
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
