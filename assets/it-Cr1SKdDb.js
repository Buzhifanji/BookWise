const menu = {
  book: "libri",
  note: "Appunti",
  setting: "Impostazioni",
  recycleBin: "cestino"
};
const setting = {
  chooseLanguage: "Scegli una lingua",
  chooseTheme: "Seleziona il tema",
  language: "lingua",
  theme: "tema",
  userSetting: "impostazioni utente",
  autoHighlightDesc: "Dopo l'apertura, quando il testo viene selezionato, verrà automaticamente evidenziato.",
  autoHighlightTitle: "Se evidenziare automaticamente",
  bookMode: "modalità libreria",
  mode: "modello",
  noteShowClassDesc: "Dopo la chiusura, lo stile di evidenziazione verrà visualizzato solo quando il mouse vi scorre sopra.",
  noteShowClassTitle: "Indica se le note visualizzano lo stile di evidenziazione",
  openNewDesc: "In caso contrario, il lettore si troverà solo sulla pagina corrente.",
  openNewTitle: "Se il lettore apre una nuova pagina",
  openRecycleBinDesc: "Chiudi il Cestino Quando elimini un libro, verrà eliminato definitivamente invece di essere spostato nel Cestino.",
  openRecycleBinTitle: "Attiva la funzione cestino",
  readMode: "modalità di lettura",
  rememberPositionDesc: "Dopo averlo aperto, accedendo nuovamente all'interfaccia di lettura si passerà automaticamente all'ultima posizione di lettura.",
  rememberPositionTitle: "Se ricordare l'ultima posizione di lettura",
  autoHighlight: "Evidenziazione automatica"
};
const unfound = {
  desc: "Siamo spiacenti, non riusciamo a trovare la pagina. \nTroverai molto da esplorare sulla home page.",
  tip: "torna alla home page",
  title: "Manca la pagina"
};
const file = {
  upload: "caricare files",
  choose: "Seleziona un documento",
  dragFile: "Trascina e rilascia i file qui",
  exist: "Il file esiste già",
  releaseMouse: "Rilascia il mouse",
  uploadSuccess: "Caricamento riuscito",
  supportFormat: "Formati supportati:"
};
const common = {
  or: "O",
  addBookshelf: "Aggiungi libreria",
  addLove: "aggiungi preferiti",
  detail: "Dettagli",
  edit: "modificare",
  forceRemove: "Elimina definitivamente",
  remove: "eliminare",
  removeLove: "Rimuovi i preferiti",
  restore: "recuperare",
  score: "punto",
  unknown: "sconosciuto",
  close: "chiusura",
  copySuccess: "Copiato con successo",
  cancel: "Annulla",
  sure: "Confermare",
  minute: "punto",
  addSuccess: "Aggiunto con successo",
  empty: "Vuoto",
  removeSuccess: "Rimosso con successo",
  removeFail: "impossibile eliminare",
  restoreFail: "Ripristino non riuscito",
  editFail: "Modifica non riuscita",
  updateFail: "Aggiornamento non riuscito",
  add: "aggiungere a",
  copy: "copia"
};
const readMode = {
  double: "Modalità doppia pagina",
  scroll: "modalità di scorrimento",
  section: "Modalità capitolo"
};
const bookMode = {
  bookshelf: "modalità libreria",
  card: "modalità carta",
  list: "modalità elenco"
};
const book = {
  author: "autore",
  bookshelf: "libreria",
  createTime: "createTime",
  detail: "Dettagli del libro",
  highlightLen: "Numero di punti salienti",
  name: "titolo del libro",
  notesLen: "Numero di note",
  openCount: "numero di volte letto",
  page: "Numero di pagine",
  publishTime: "Data di pubblicazione",
  publisher: "Editore",
  readProgress: "progressi nella lettura",
  score: "punto",
  size: "misurare",
  totalReadTime: "Tempo di lettura totale",
  updateTime: "Tempo di aggiornamento",
  readDetailFail: "Impossibile leggere i dettagli del libro",
  thisReadTime: "Questo momento di lettura",
  addToBookshelfFail: "Aggiunta allo scaffale non riuscita",
  addToBookshelfSuccess: "Aggiunto allo scaffale con successo",
  addToBookshelf: "Aggiungi alla libreria",
  getBookshelfFail: "Impossibile ottenere lo scaffale",
  neeSelectBookshelf: "Seleziona libreria",
  needBookshelfName: "Inserisci il nome dello scaffale",
  cover: "copertina del libro",
  needAuhor: "Inserisci il nome dell'autore",
  needBookName: "Inserisci il titolo del libro",
  uploadCover: "Carica la copertina",
  uploadCoverFial: "Impossibile caricare la copertina",
  forceRemove: "Elimina questo libro definitivamente",
  moveToRecycleBin: "Sposta questo libro nel cestino",
  removeBook: "eliminare il libro",
  empty: "L'elenco dei libri è vuoto",
  needScore: "Inserisci la valutazione",
  recycleNoRecord: "Non c'è traccia dei dati cancellati nel Cestino!",
  uploadBookTip: "Fai clic sul pulsante di caricamento per caricare un libro localmente e quindi inizia a immergerti nel mare dei libri!",
  getBookFail: "Impossibile ottenere il libro",
  getBookListFail: "Impossibile leggere l'elenco dei libri",
  getBookReadTimeFail: "Impossibile leggere l'elenco degli orari di lettura del libro",
  getBookReadTimeListFail: "Impossibile leggere l'elenco degli orari di lettura del libro",
  importBookFail: "Impossibile importare i libri",
  recordBookTimeFail: "Impossibile registrare il tempo di lettura",
  needAuthor: "Inserisci il nome dell'autore",
  uploadCoverFail: "Impossibile caricare la copertina",
  jumpToBookList: "Vai all'elenco dei libri",
  jumpToLastPosition: "Passa all'ultima posizione di lettura"
};
const note = {
  addNoteFail: "Impossibile aggiungere la nota",
  getNoteFail: "Impossibile leggere l'elenco delle note",
  getNoteListFail: "Impossibile leggere l'elenco delle note",
  empty: "L'elenco delle note è vuoto",
  emptyNoteListTip: "Nell'interfaccia dell'elenco dei libri, seleziona un libro da leggere, quindi seleziona il testo che attira la tua attenzione e inserisci i tuoi pensieri nella finestra di dialogo pop-up",
  forceRemove: "Elimina questa nota in modo permanente",
  noteDetail: "Nota i dettagli",
  removeSuccess: "Nota eliminata correttamente",
  sureRemove: "Conferma l'eliminazione della nota",
  placeholder: "Scrivi i tuoi pensieri in questo momento...",
  write: "scrivere idee"
};
const tag = {
  needTag: "Inserisci l'etichetta",
  removeTagSuccess: "Tag eliminato con successo"
};
const statistics = {
  bookUnit: "Libro",
  noteUnit: "Capitolo",
  readTime: "durata",
  readTimeUnit: "Ora",
  readTotalTime: "durata totale",
  readed: "Ho letto",
  reading: "lettura",
  thisMouthNote: "Appunti per questo mese",
  thisMouthReadTime: "Durata di questo mese",
  thisMouthReaded: "Leggi questo mese",
  thisMouthReading: "Lettura questo mese",
  total: "L'ammontare totale",
  myLove: "il mio preferito",
  currentReading: "Leggendo di recente"
};
const line = {
  beeline: "retta",
  marker: "marcatore",
  wavy: "linee ondulate"
};
const pdf = {
  auto: "Ridimensionamento automatico",
  pageActual: "dimensione reale",
  pageFit: "adatta alla pagina",
  pageWidth: "Adatta alla larghezza della pagina"
};
const it = {
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
  it as default,
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
