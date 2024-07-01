const menu = {
  book: "książki",
  note: "Notatki",
  setting: "Ustawienia",
  recycleBin: "kosz"
};
const setting = {
  chooseLanguage: "Wybierz język",
  chooseTheme: "Wybierz motyw",
  language: "język",
  theme: "temat",
  userSetting: "ustawienia użytkownika",
  autoHighlightDesc: "Po otwarciu, gdy tekst zostanie zaznaczony, zostanie on automatycznie podświetlony.",
  autoHighlightTitle: "Czy automatycznie podświetlać",
  bookMode: "tryb półki na książki",
  mode: "Model",
  noteShowClassDesc: "Po zamknięciu styl podświetlenia zostanie wyświetlony dopiero po najechaniu na niego myszką.",
  noteShowClassTitle: "Określa, czy notatki mają wyświetlać styl wyróżnienia",
  openNewDesc: "Jeśli nie, czytelnik będzie tylko na bieżącej stronie.",
  openNewTitle: "Czy czytelnik otwiera nową stronę",
  openRecycleBinDesc: "Zamknij Kosz. Gdy usuniesz książkę, zostanie ona trwale usunięta, a nie przeniesiona do Kosza.",
  openRecycleBinTitle: "Włącz funkcję kosza",
  readMode: "tryb czytania",
  rememberPositionDesc: "Po jego otwarciu ponowne wejście do interfejsu czytania spowoduje automatyczne przejście do ostatniej pozycji czytania.",
  rememberPositionTitle: "Czy zapamiętać ostatnią pozycję do czytania",
  autoHighlight: "Automatyczne podświetlenie"
};
const unfound = {
  desc: "Przepraszamy, nie możemy znaleźć strony. \nNa stronie głównej znajdziesz wiele do odkrycia.",
  tip: "powrót do strony głównej",
  title: "Brakuje strony"
};
const file = {
  upload: "przesłać pliki",
  choose: "Wybierz dokument",
  dragFile: "Przeciągnij i upuść pliki tutaj",
  exist: "plik już istnieje",
  releaseMouse: "Zwolnij mysz",
  uploadSuccess: "Wysyłanie zakończone",
  supportFormat: "Obsługiwane formaty:"
};
const common = {
  or: "Lub",
  addBookshelf: "Dodaj półkę na książki",
  addLove: "Dodaj ulubione",
  detail: "Detale",
  edit: "edytować",
  forceRemove: "Usuń trwale",
  remove: "usuwać",
  removeLove: "Usuń ulubione",
  restore: "odzyskiwać",
  score: "wynik",
  unknown: "nieznany",
  close: "zamknięcie",
  copySuccess: "Skopiowano pomyślnie",
  cancel: "Anulować",
  sure: "potwierdzać",
  minute: "punkt",
  addSuccess: "Dodano pomyślnie",
  empty: "Pusty",
  removeSuccess: "Usunięto pomyślnie",
  removeFail: "nie udało się usunąć",
  restoreFail: "Przywracanie nie powiodło się",
  editFail: "Edycja nie powiodła się",
  updateFail: "Aktualizacja nie powiodła się",
  add: "Dodać do",
  copy: "Kopiuj"
};
const readMode = {
  double: "Tryb podwójnej strony",
  scroll: "tryb przewijania",
  section: "Tryb rozdziału"
};
const bookMode = {
  bookshelf: "tryb półki na książki",
  card: "tryb karty",
  list: "tryb listy"
};
const book = {
  author: "autor",
  bookshelf: "półka na książki",
  createTime: "utwórz czas",
  detail: "Szczegóły książki",
  highlightLen: "Liczba najważniejszych wydarzeń",
  name: "tytuł książki",
  notesLen: "Liczba notatek",
  openCount: "ilość razy przeczytana",
  page: "Numer stron",
  publishTime: "Data publikacji",
  publisher: "Wydawca",
  readProgress: "postęp w czytaniu",
  score: "wynik",
  size: "rozmiar",
  totalReadTime: "Całkowity czas czytania",
  updateTime: "Czas aktualizacji",
  readDetailFail: "Nie udało się odczytać szczegółów książki",
  thisReadTime: "Ten czas czytania",
  addToBookshelfFail: "Nie udało się dodać do półki",
  addToBookshelfSuccess: "Dodano do półki z książkami",
  addToBookshelf: "Dodaj do półki z książkami",
  getBookshelfFail: "Nie udało się pobrać półki na książki",
  neeSelectBookshelf: "Proszę wybrać półkę na książki",
  needBookshelfName: "Proszę wpisać nazwę półki na książki",
  cover: "okładka książki",
  needAuhor: "Proszę wpisać nazwisko autora",
  needBookName: "Proszę wpisać tytuł książki",
  uploadCover: "Prześlij okładkę",
  uploadCoverFial: "Nie udało się przesłać okładki",
  forceRemove: "Usuń tę książkę trwale",
  moveToRecycleBin: "Przenieś tę książkę do kosza",
  removeBook: "usuń książkę",
  empty: "Lista książek jest pusta",
  needScore: "Proszę wprowadzić ocenę",
  recycleNoRecord: "W Koszu nie ma żadnych zapisów o usuniętych danych!",
  uploadBookTip: "Kliknij przycisk przesyłania, aby przesłać książkę lokalnie, a następnie zacznij zanurzać się w morzu książek!",
  getBookFail: "Nie udało się pobrać książki",
  getBookListFail: "Nie udało się odczytać listy książek",
  getBookReadTimeFail: "Nie udało się odczytać listy godzin czytania książki",
  getBookReadTimeListFail: "Nie udało się odczytać listy godzin czytania książki",
  importBookFail: "Nie udało się zaimportować książek",
  recordBookTimeFail: "Nie udało się zarejestrować czasu czytania",
  needAuthor: "Proszę wpisać nazwisko autora",
  uploadCoverFail: "Nie udało się przesłać okładki",
  jumpToBookList: "Przejdź do listy książek",
  jumpToLastPosition: "Przejdź do ostatniej pozycji czytania"
};
const note = {
  addNoteFail: "Nie udało się dodać notatki",
  getNoteFail: "Nie udało się odczytać listy notatek",
  getNoteListFail: "Nie udało się odczytać listy notatek",
  empty: "Lista notatek jest pusta",
  emptyNoteListTip: "W interfejsie listy książek wybierz książkę do przeczytania, następnie zaznacz tekst, który przyciąga Twoją uwagę i wpisz swoje przemyślenia w wyskakującym oknie dialogowym",
  forceRemove: "Usuń tę notatkę trwale",
  noteDetail: "Zanotuj szczegóły",
  removeSuccess: "Uwaga została pomyślnie usunięta",
  sureRemove: "Potwierdź usunięcie notatki",
  placeholder: "Zapisz swoje myśli w tej chwili...",
  write: "pisać pomysły"
};
const tag = {
  needTag: "Proszę wpisać tag",
  removeTagSuccess: "Tag został pomyślnie usunięty"
};
const statistics = {
  bookUnit: "Książka",
  noteUnit: "Rozdział",
  readTime: "czas trwania",
  readTimeUnit: "Godzina",
  readTotalTime: "całkowity czas trwania",
  readed: "Przeczytałem",
  reading: "czytanie",
  thisMouthNote: "Notatki na ten miesiąc",
  thisMouthReadTime: "Czas trwania tego miesiąca",
  thisMouthReaded: "Przeczytaj w tym miesiącu",
  thisMouthReading: "Czytanie w tym miesiącu",
  total: "Całkowita kwota",
  myLove: "mój ulubiony",
  currentReading: "Ostatnio czytam"
};
const line = {
  beeline: "linia prosta",
  marker: "znacznik",
  wavy: "faliste linie"
};
const pdf = {
  auto: "Automatyczne skalowanie",
  pageActual: "rzeczywisty rozmiar",
  pageFit: "Dopasuj do strony",
  pageWidth: "Dopasuj do szerokości strony"
};
const pl = {
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
  pl as default,
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
