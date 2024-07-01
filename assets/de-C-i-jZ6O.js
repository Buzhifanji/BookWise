const menu = {
  book: "Bücher",
  note: "Anmerkungen",
  setting: "aufstellen",
  recycleBin: "Papierkorb"
};
const setting = {
  chooseLanguage: "Wählen Sie eine Sprache",
  chooseTheme: "Thema wählen",
  language: "Sprache",
  theme: "Thema",
  userSetting: "Benutzereinstellungen",
  autoHighlightDesc: "Wenn nach dem Öffnen Text ausgewählt wird, wird er automatisch hervorgehoben.",
  autoHighlightTitle: "Ob automatisch hervorgehoben werden soll",
  bookMode: "Bücherregalmodus",
  mode: "Modell",
  noteShowClassDesc: "Nach dem Schließen wird der Hervorhebungsstil nur dann angezeigt, wenn die Maus darüber fährt.",
  noteShowClassTitle: "Ob Notizen den Hervorhebungsstil anzeigen",
  openNewDesc: "Andernfalls befindet sich der Leser nur auf der aktuellen Seite.",
  openNewTitle: "Ob der Leser eine neue Seite öffnet",
  openRecycleBinDesc: "Schließen Sie den Papierkorb. Wenn Sie ein Buch löschen, wird es dauerhaft gelöscht, anstatt in den Papierkorb verschoben zu werden.",
  openRecycleBinTitle: "Schalten Sie die Papierkorbfunktion ein",
  readMode: "Lesemodus",
  rememberPositionDesc: "Nach dem Öffnen wird beim erneuten Aufrufen der Leseoberfläche automatisch zur letzten Leseposition gesprungen.",
  rememberPositionTitle: "Ob die letzte Leseposition gespeichert werden soll",
  autoHighlight: "Automatische Hervorhebung"
};
const unfound = {
  desc: "Leider können wir die Seite nicht finden. \nAuf der Homepage gibt es viel zu entdecken.",
  tip: "zurück zur Homepage",
  title: "Die Seite fehlt"
};
const file = {
  upload: "Daten hochladen",
  choose: "Wählen Sie ein Dokument aus",
  dragFile: "Ziehen Sie Dateien hierher und legen Sie sie dort ab",
  exist: "Die Datei existiert bereits",
  releaseMouse: "Lassen Sie die Maus los",
  uploadSuccess: "Hochladen erfolgreich",
  supportFormat: "Unterstützte Formate:"
};
const common = {
  or: "oder",
  addBookshelf: "Bücherregal hinzufügen",
  addLove: "füge Favoriten hinzu",
  detail: "Einzelheiten",
  edit: "bearbeiten",
  forceRemove: "Dauerhaft löschen",
  remove: "löschen",
  removeLove: "Favoriten entfernen",
  restore: "genesen",
  score: "Punktzahl",
  unknown: "Unbekannt",
  close: "Schließung",
  copySuccess: "Erfolgreich kopiert",
  cancel: "Stornieren",
  sure: "bestätigen",
  minute: "Punkt",
  addSuccess: "Erfolgreich hinzugefügt",
  empty: "Leer",
  removeSuccess: "Erfolgreich entfernt",
  removeFail: "konnte nicht gelöscht werden",
  restoreFail: "Wiederherstellung fehlgeschlagen",
  editFail: "Die Bearbeitung ist fehlgeschlagen",
  updateFail: "Update fehlgeschlagen",
  add: "Hinzufügen zu",
  copy: "Kopieren"
};
const readMode = {
  double: "Doppelseitenmodus",
  scroll: "Scroll-Modus",
  section: "Kapitelmodus"
};
const bookMode = {
  bookshelf: "Bücherregalmodus",
  card: "Kartenmodus",
  list: "Listenmodus"
};
const book = {
  author: "Autor",
  bookshelf: "Bücherregal",
  createTime: "Zeit schaffen",
  detail: "Buchdetails",
  highlightLen: "Anzahl der Highlights",
  name: "Buchtitel",
  notesLen: "Anzahl der Noten",
  openCount: "Häufigkeit des Lesens",
  page: "Seitenzahl",
  publishTime: "Veröffentlichungsdatum",
  publisher: "Herausgeber",
  readProgress: "Lesefortschritt",
  score: "Punktzahl",
  size: "Größe",
  totalReadTime: "Gesamtlesezeit",
  updateTime: "Updatezeit",
  readDetailFail: "Buchdetails konnten nicht gelesen werden",
  thisReadTime: "Diese Lesezeit",
  addToBookshelfFail: "Beim Hinzufügen zum Bücherregal ist ein Fehler aufgetreten",
  addToBookshelfSuccess: "Erfolgreich zum Bücherregal hinzugefügt",
  addToBookshelf: "Zum Bücherregal hinzufügen",
  getBookshelfFail: "Bücherregal konnte nicht abgerufen werden",
  neeSelectBookshelf: "Bitte Bücherregal auswählen",
  needBookshelfName: "Bitte geben Sie einen Bücherregalnamen ein",
  cover: "Buchcover",
  needAuhor: "Bitte geben Sie den Namen des Autors ein",
  needBookName: "Bitte geben Sie den Buchtitel ein",
  uploadCover: "Cover hochladen",
  uploadCoverFial: "Das Cover konnte nicht hochgeladen werden",
  forceRemove: "Dieses Buch endgültig löschen",
  moveToRecycleBin: "Verschieben Sie dieses Buch in den Papierkorb",
  removeBook: "Buch löschen",
  empty: "Die Bücherliste ist leer",
  needScore: "Bitte geben Sie eine Bewertung ein",
  recycleNoRecord: "Es gibt keine Aufzeichnung gelöschter Daten im Papierkorb!",
  uploadBookTip: "Klicken Sie auf die Schaltfläche „Hochladen“, um ein Buch lokal hochzuladen, und tauchen Sie dann in das Meer der Bücher ein!",
  getBookFail: "Buch konnte nicht abgerufen werden",
  getBookListFail: "Buchliste konnte nicht gelesen werden",
  getBookReadTimeFail: "Die Liste der Buchlesezeiten konnte nicht gelesen werden",
  getBookReadTimeListFail: "Die Liste der Buchlesezeiten konnte nicht gelesen werden",
  importBookFail: "Bücher konnten nicht importiert werden",
  recordBookTimeFail: "Lesezeit konnte nicht aufgezeichnet werden",
  needAuthor: "Bitte geben Sie den Namen des Autors ein",
  uploadCoverFail: "Das Cover konnte nicht hochgeladen werden",
  jumpToBookList: "Zur Buchliste springen",
  jumpToLastPosition: "Zur letzten Leseposition springen"
};
const note = {
  addNoteFail: "Notiz konnte nicht hinzugefügt werden",
  getNoteFail: "Notizenliste konnte nicht gelesen werden",
  getNoteListFail: "Notizenliste konnte nicht gelesen werden",
  empty: "Die Notizliste ist leer",
  emptyNoteListTip: "Wählen Sie in Ihrer Buchlistenoberfläche ein Buch zum Lesen aus, wählen Sie dann den Text aus, der Ihre Aufmerksamkeit erregt, und geben Sie Ihre Gedanken in das Popup-Dialogfeld ein",
  forceRemove: "Löschen Sie diese Notiz dauerhaft",
  noteDetail: "Details beachten",
  removeSuccess: "Notiz erfolgreich gelöscht",
  sureRemove: "Bestätigen Sie das Löschen der Notiz",
  placeholder: "Schreiben Sie Ihre Gedanken zu diesem Zeitpunkt auf ...",
  write: "Ideen schreiben"
};
const tag = {
  needTag: "Bitte Tag eingeben",
  removeTagSuccess: "Tag erfolgreich gelöscht"
};
const statistics = {
  bookUnit: "Buch",
  noteUnit: "Kapitel",
  readTime: "Dauer",
  readTimeUnit: "Stunde",
  readTotalTime: "Gesamtdauer",
  readed: "Habe gelesen",
  reading: "Lektüre",
  thisMouthNote: "Notizen für diesen Monat",
  thisMouthReadTime: "Dauer dieses Monats",
  thisMouthReaded: "Lesen Sie diesen Monat",
  thisMouthReading: "Diesen Monat lesen",
  total: "Der Gesamtbetrag",
  myLove: "mein Lieblings",
  currentReading: "Kürzlich gelesen"
};
const line = {
  beeline: "gerade Linie",
  marker: "Marker",
  wavy: "Wellenlinien"
};
const pdf = {
  auto: "Automatische Skalierung",
  pageActual: "tatsächliche Größe",
  pageFit: "An die Seite anpassen",
  pageWidth: "An Seitenbreite anpassen"
};
const de = {
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
  de as default,
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
