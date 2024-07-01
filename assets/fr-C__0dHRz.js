const menu = {
  book: "livres",
  note: "Remarques",
  setting: "installation",
  recycleBin: "corbeille"
};
const setting = {
  chooseLanguage: "Choisissez une langue",
  chooseTheme: "Sélectionne un thème",
  language: "langue",
  theme: "thème",
  userSetting: "paramètres utilisateur",
  autoHighlightDesc: "Après ouverture, lorsque le texte est sélectionné, il sera automatiquement mis en surbrillance.",
  autoHighlightTitle: "S'il faut mettre automatiquement en surbrillance",
  bookMode: "mode bibliothèque",
  mode: "modèle",
  noteShowClassDesc: "Après la fermeture, le style de surbrillance ne s'affichera que lorsque la souris passera dessus.",
  noteShowClassTitle: "Si les notes affichent le style de surbrillance",
  openNewDesc: "Dans le cas contraire, le lecteur ne sera que sur la page en cours.",
  openNewTitle: "Si le lecteur ouvre une nouvelle page",
  openRecycleBinDesc: "Fermez la corbeille Lorsque vous supprimez un livre, il sera définitivement supprimé au lieu d'être déplacé vers la corbeille.",
  openRecycleBinTitle: "Activez la fonction corbeille",
  readMode: "mode lecture",
  rememberPositionDesc: "Après l'avoir ouvert, entrer à nouveau dans l'interface de lecture passera automatiquement à la dernière position de lecture.",
  rememberPositionTitle: "S'il faut mémoriser la dernière position de lecture",
  autoHighlight: "Mise en surbrillance automatique"
};
const unfound = {
  desc: "Désolé, nous ne trouvons pas la page. \nVous trouverez beaucoup de choses à explorer sur la page d'accueil.",
  tip: "Retour à la page d'accueil",
  title: "La page manque"
};
const file = {
  upload: "télécharger des fichiers",
  choose: "Sélectionnez un document",
  dragFile: "Glissez et déposez les fichiers ici",
  exist: "Le fichier existe déjà",
  releaseMouse: "Relâcher la souris",
  uploadSuccess: "Téléchargement réussi",
  supportFormat: "Formats pris en charge :"
};
const common = {
  or: "ou",
  addBookshelf: "Ajouter une bibliothèque",
  addLove: "ajouter des favoris",
  detail: "Détails",
  edit: "modifier",
  forceRemove: "supprimer définitivement",
  remove: "supprimer",
  removeLove: "Supprimer les favoris",
  restore: "récupérer",
  score: "score",
  unknown: "inconnu",
  close: "fermeture",
  copySuccess: "Copié avec succès",
  cancel: "Annuler",
  sure: "confirmer",
  minute: "indiquer",
  addSuccess: "Ajouté avec succès",
  empty: "Vide",
  removeSuccess: "Supprimé avec succès",
  removeFail: "échec de la suppression",
  restoreFail: "La restauration a échoué",
  editFail: "Échec de la modification",
  updateFail: "Mise à jour a échoué",
  add: "Ajouter à",
  copy: "copie"
};
const readMode = {
  double: "Mode double page",
  scroll: "mode défilement",
  section: "Mode chapitre"
};
const bookMode = {
  bookshelf: "mode bibliothèque",
  card: "mode carte",
  list: "mode liste"
};
const book = {
  author: "auteur",
  bookshelf: "étagère à livres",
  createTime: "créer du temps",
  detail: "Détails du livre",
  highlightLen: "Nombre de faits saillants",
  name: "titre de livre",
  notesLen: "Nombre de notes",
  openCount: "nombre de fois lu",
  page: "Nombre de pages",
  publishTime: "Date de publication",
  publisher: "Éditeur",
  readProgress: "progression de la lecture",
  score: "score",
  size: "taille",
  totalReadTime: "Temps de lecture total",
  updateTime: "Temps de mise à jour",
  readDetailFail: "Échec de la lecture des détails du livre",
  thisReadTime: "Ce temps de lecture",
  addToBookshelfFail: "Échec de l'ajout à la bibliothèque",
  addToBookshelfSuccess: "Ajouté à la bibliothèque avec succès",
  addToBookshelf: "Ajouter à la bibliothèque",
  getBookshelfFail: "Échec de l'obtention de la bibliothèque",
  neeSelectBookshelf: "Veuillez sélectionner une bibliothèque",
  needBookshelfName: "Veuillez saisir le nom de la bibliothèque",
  cover: "couverture du livre",
  needAuhor: "Veuillez entrer le nom de l'auteur",
  needBookName: "Veuillez entrer le titre du livre",
  uploadCover: "Télécharger la couverture",
  uploadCoverFial: "Échec du téléchargement de la couverture",
  forceRemove: "Supprimer définitivement ce livre",
  moveToRecycleBin: "Déplacer ce livre à la poubelle",
  removeBook: "supprimer un livre",
  empty: "La liste des livres est vide",
  needScore: "Veuillez entrer une note",
  recycleNoRecord: "Il n'y a aucun enregistrement des données supprimées dans la corbeille !",
  uploadBookTip: "Cliquez sur le bouton de téléchargement pour télécharger un livre localement, puis commencez à vous immerger dans la mer de livres !",
  getBookFail: "Échec de l'obtention du livre",
  getBookListFail: "Échec de la lecture de la liste des livres",
  getBookReadTimeFail: "Échec de la lecture de la liste des heures de lecture du livre",
  getBookReadTimeListFail: "Échec de la lecture de la liste des heures de lecture du livre",
  importBookFail: "Échec de l'importation des livres",
  recordBookTimeFail: "Échec de l'enregistrement du temps de lecture",
  needAuthor: "Veuillez entrer le nom de l'auteur",
  uploadCoverFail: "Échec du téléchargement de la couverture",
  jumpToBookList: "Aller à la liste des livres",
  jumpToLastPosition: "Passer à la dernière position de lecture"
};
const note = {
  addNoteFail: "Échec de l'ajout d'une note",
  getNoteFail: "Échec de la lecture de la liste de notes",
  getNoteListFail: "Échec de la lecture de la liste de notes",
  empty: "La liste de notes est vide",
  emptyNoteListTip: "Dans l'interface de votre liste de livres, sélectionnez un livre à lire, puis sélectionnez le texte qui attire votre attention et saisissez vos réflexions dans la boîte de dialogue contextuelle.",
  forceRemove: "Supprimer définitivement cette note",
  noteDetail: "Détails des notes",
  removeSuccess: "Note supprimée avec succès",
  sureRemove: "Confirmer la suppression de la note",
  placeholder: "Écrivez vos pensées à ce moment-là...",
  write: "écrire des idées"
};
const tag = {
  needTag: "Veuillez saisir le tag",
  removeTagSuccess: "Balise supprimée avec succès"
};
const statistics = {
  bookUnit: "Livre",
  noteUnit: "Chapitre",
  readTime: "durée",
  readTimeUnit: "Heure",
  readTotalTime: "durée totale",
  readed: "Ont lu",
  reading: "en lisant",
  thisMouthNote: "Notes pour ce mois",
  thisMouthReadTime: "Durée de ce mois",
  thisMouthReaded: "Lire ce mois-ci",
  thisMouthReading: "Lecture ce mois-ci",
  total: "Le montant total",
  myLove: "mon favori",
  currentReading: "Lecture récente"
};
const line = {
  beeline: "ligne droite",
  marker: "marqueur",
  wavy: "lignes ondulées"
};
const pdf = {
  auto: "Mise à l'échelle automatique",
  pageActual: "taille actuelle",
  pageFit: "ajuster à la page",
  pageWidth: "Ajuster à la largeur de la page"
};
const fr = {
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
  fr as default,
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
