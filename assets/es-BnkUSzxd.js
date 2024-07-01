const menu = {
  book: "libros",
  note: "notas",
  setting: "configuración",
  recycleBin: "papelera de reciclaje"
};
const setting = {
  chooseLanguage: "Elige un idioma",
  chooseTheme: "Seleccione el tema",
  language: "idioma",
  theme: "tema",
  userSetting: "ajustes de usuario",
  autoHighlightDesc: "Después de abrir, cuando se selecciona el texto, se resaltará automáticamente.",
  autoHighlightTitle: "Ya sea para resaltar automáticamente",
  bookMode: "modo estantería",
  mode: "modelo",
  noteShowClassDesc: "Después de cerrar, el estilo resaltado solo se mostrará cuando el mouse se deslice sobre él.",
  noteShowClassTitle: "Si las notas muestran estilo resaltado",
  openNewDesc: "De lo contrario, el lector sólo estará en la página actual.",
  openNewTitle: "Si el lector abre una nueva página",
  openRecycleBinDesc: "Cierre la Papelera de reciclaje Cuando elimine un libro, se eliminará permanentemente en lugar de trasladarse a la Papelera de reciclaje.",
  openRecycleBinTitle: "Activar la función de papelera de reciclaje",
  readMode: "modo de lectura",
  rememberPositionDesc: "Después de abrirlo, al ingresar nuevamente a la interfaz de lectura saltará automáticamente a la última posición de lectura.",
  rememberPositionTitle: "Si recordar la última posición de lectura",
  autoHighlight: "Resaltado automático"
};
const unfound = {
  desc: "Lo sentimos, no podemos encontrar la página. \nEncontrarás mucho para explorar en la página de inicio.",
  tip: "volver a la página de inicio",
  title: "falta la pagina"
};
const file = {
  upload: "subir archivos",
  choose: "Seleccione un documento",
  dragFile: "Arrastra y suelta archivos aquí",
  exist: "El archivo ya existe",
  releaseMouse: "Soltar el mouse",
  uploadSuccess: "Subida exitosa",
  supportFormat: "Formatos soportados:"
};
const common = {
  or: "o",
  addBookshelf: "Agregar estantería",
  addLove: "Agregar favoritos",
  detail: "Detalles",
  edit: "editar",
  forceRemove: "borrar permanentemente",
  remove: "borrar",
  removeLove: "Eliminar favoritos",
  restore: "recuperar",
  score: "puntaje",
  unknown: "desconocido",
  close: "cierre",
  copySuccess: "Copiado exitosamente",
  cancel: "Cancelar",
  sure: "confirmar",
  minute: "punto",
  addSuccess: "Agregado exitosamente",
  empty: "Vacío",
  removeSuccess: "Eliminado con éxito",
  removeFail: "no se pudo eliminar",
  restoreFail: "Restauración fallida",
  editFail: "Editar falló",
  updateFail: "La actualización falló",
  add: "añadir",
  copy: "Copiar"
};
const readMode = {
  double: "Modo de doble página",
  scroll: "modo de desplazamiento",
  section: "Modo capítulo"
};
const bookMode = {
  bookshelf: "modo estantería",
  card: "modo tarjeta",
  list: "modo lista"
};
const book = {
  author: "autor",
  bookshelf: "estante para libros",
  createTime: "creartiempo",
  detail: "Detalles del libro",
  highlightLen: "Número de destacados",
  name: "Titulo del libro",
  notesLen: "numero de notas",
  openCount: "número de veces leído",
  page: "Número de páginas",
  publishTime: "Fecha de Publicación",
  publisher: "Editor",
  readProgress: "progreso de lectura",
  score: "puntaje",
  size: "tamaño",
  totalReadTime: "tiempo total de lectura",
  updateTime: "Tiempo de actualizacion",
  readDetailFail: "No se han podido leer los detalles del libro",
  thisReadTime: "este tiempo de lectura",
  addToBookshelfFail: "Error al agregar a la estantería",
  addToBookshelfSuccess: "Agregado a la estantería con éxito",
  addToBookshelf: "Añadir a la estantería",
  getBookshelfFail: "No se pudo obtener la estantería",
  neeSelectBookshelf: "Por favor seleccione estantería",
  needBookshelfName: "Por favor ingresa un nombre de estantería",
  cover: "tapa del libro",
  needAuhor: "Por favor ingrese el nombre del autor",
  needBookName: "Por favor introduce el título del libro.",
  uploadCover: "Subir portada",
  uploadCoverFial: "No se pudo cargar la portada",
  forceRemove: "Eliminar este libro permanentemente",
  moveToRecycleBin: "Mueve este libro a la papelera.",
  removeBook: "borrar libro",
  empty: "La lista de libros está vacía",
  needScore: "Por favor ingrese la calificación",
  recycleNoRecord: "¡No hay ningún registro de datos eliminados en la Papelera de reciclaje!",
  uploadBookTip: "Haga clic en el botón cargar para cargar un libro localmente y luego comience a sumergirse en el mar de libros.",
  getBookFail: "No se pudo obtener el libro",
  getBookListFail: "No se pudo leer la lista de libros",
  getBookReadTimeFail: "No se pudo leer la lista de horas de lectura del libro",
  getBookReadTimeListFail: "No se pudo leer la lista de horas de lectura del libro",
  importBookFail: "No se pudieron importar libros",
  recordBookTimeFail: "No se pudo registrar el tiempo de lectura",
  needAuthor: "Por favor ingrese el nombre del autor",
  uploadCoverFail: "No se pudo cargar la portada",
  jumpToBookList: "Saltar a la lista de libros",
  jumpToLastPosition: "Saltar a la última posición de lectura"
};
const note = {
  addNoteFail: "No se pudo agregar la nota",
  getNoteFail: "No se pudo leer la lista de notas",
  getNoteListFail: "No se pudo leer la lista de notas",
  empty: "La lista de notas está vacía",
  emptyNoteListTip: "En la interfaz de su lista de libros, seleccione un libro para leer, luego seleccione el texto que le llame la atención e ingrese sus pensamientos en el cuadro de diálogo emergente.",
  forceRemove: "Eliminar esta nota permanentemente",
  noteDetail: "Detalles de la nota",
  removeSuccess: "Nota eliminada exitosamente",
  sureRemove: "Confirmar eliminación de nota",
  placeholder: "Escribe tus pensamientos en este momento...",
  write: "escribir ideas"
};
const tag = {
  needTag: "Por favor ingresa la etiqueta",
  removeTagSuccess: "Etiqueta eliminada correctamente"
};
const statistics = {
  bookUnit: "Libro",
  noteUnit: "Capítulo",
  readTime: "duración",
  readTimeUnit: "Hora",
  readTotalTime: "duración total",
  readed: "Han leído",
  reading: "lectura",
  thisMouthNote: "Notas para este mes",
  thisMouthReadTime: "Duración de este mes",
  thisMouthReaded: "Leer este mes",
  thisMouthReading: "Leyendo este mes",
  total: "La cantidad total",
  myLove: "mi favorito",
  currentReading: "Leyendo recientemente"
};
const line = {
  beeline: "línea recta",
  marker: "marcador",
  wavy: "lineas onduladas"
};
const pdf = {
  auto: "Escalado automático",
  pageActual: "tamaño real",
  pageFit: "ajustar a la página",
  pageWidth: "Ajustar al ancho de página"
};
const es = {
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
  es as default,
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
