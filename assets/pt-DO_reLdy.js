const menu = {
  book: "livros",
  note: "notas",
  setting: "configurar",
  recycleBin: "Lixeira de reciclagem"
};
const setting = {
  chooseLanguage: "Escolha um idioma",
  chooseTheme: "Selecione o tema",
  language: "linguagem",
  theme: "tema",
  userSetting: "Configurações do Usuário",
  autoHighlightDesc: "Após a abertura, quando o texto for selecionado, ele será automaticamente destacado.",
  autoHighlightTitle: "Se deve destacar automaticamente",
  bookMode: "modo estante",
  mode: "modelo",
  noteShowClassDesc: "Após fechar, o estilo de destaque só será exibido quando o mouse passar sobre ele.",
  noteShowClassTitle: "Se as notas exibem o estilo de destaque",
  openNewDesc: "Caso contrário, o leitor estará apenas na página atual.",
  openNewTitle: "Se o leitor abre uma nova página",
  openRecycleBinDesc: "Feche a Lixeira Ao excluir um livro, ele será excluído permanentemente em vez de ser movido para a Lixeira.",
  openRecycleBinTitle: "Ative a função de lixeira",
  readMode: "modo de leitura",
  rememberPositionDesc: "Após abri-lo, entrar novamente na interface de leitura saltará automaticamente para a última posição de leitura.",
  rememberPositionTitle: "Se deve lembrar a última posição de leitura",
  autoHighlight: "Destaque automático"
};
const unfound = {
  desc: "Desculpe, não conseguimos encontrar a página. \nVocê encontrará muito para explorar na página inicial.",
  tip: "Voltar a página inicial",
  title: "A página está faltando"
};
const file = {
  upload: "fazer upload de arquivos",
  choose: "Selecione um documento",
  dragFile: "Arraste e solte arquivos aqui",
  exist: "O arquivo já existe",
  releaseMouse: "Solte o mouse",
  uploadSuccess: "Carregamento bem-sucedido",
  supportFormat: "Formatos suportados:"
};
const common = {
  or: "ou",
  addBookshelf: "Adicionar estante",
  addLove: "adicionar favoritos",
  detail: "Detalhes",
  edit: "editar",
  forceRemove: "Apagar permanentemente",
  remove: "excluir",
  removeLove: "Remover favoritos",
  restore: "recuperar",
  score: "pontuação",
  unknown: "desconhecido",
  close: "fecho",
  copySuccess: "Copiado com sucesso",
  cancel: "Cancelar",
  sure: "confirme",
  minute: "apontar",
  addSuccess: "Adicionado com sucesso",
  empty: "Vazio",
  removeSuccess: "Removido com sucesso",
  removeFail: "não foi possível excluir",
  restoreFail: "Falha na restauração",
  editFail: "Falha na edição",
  updateFail: "Atualização falhou",
  add: "adicionar à",
  copy: "cópia de"
};
const readMode = {
  double: "Modo página dupla",
  scroll: "modo de rolagem",
  section: "Modo capítulo"
};
const bookMode = {
  bookshelf: "modo estante",
  card: "modo de cartão",
  list: "modo de lista"
};
const book = {
  author: "autor",
  bookshelf: "estante",
  createTime: "criarTempo",
  detail: "Detalhes do livro",
  highlightLen: "Número de destaques",
  name: "título do livro",
  notesLen: "Número de notas",
  openCount: "número de vezes que li",
  page: "Número de páginas",
  publishTime: "Data de publicação",
  publisher: "Editor",
  readProgress: "progresso de leitura",
  score: "pontuação",
  size: "tamanho",
  totalReadTime: "Tempo total de leitura",
  updateTime: "Tempo de atualização",
  readDetailFail: "Falha ao ler os detalhes do livro",
  thisReadTime: "Este tempo de leitura",
  addToBookshelfFail: "Falha ao adicionar à estante",
  addToBookshelfSuccess: "Adicionado à estante com sucesso",
  addToBookshelf: "Adicionar à estante",
  getBookshelfFail: "Falha ao obter estante",
  neeSelectBookshelf: "Selecione a estante",
  needBookshelfName: "Por favor insira o nome da estante",
  cover: "capa de livro",
  needAuhor: "Por favor insira o nome do autor",
  needBookName: "Por favor insira o título do livro",
  uploadCover: "Carregar capa",
  uploadCoverFial: "Falha ao carregar a capa",
  forceRemove: "Excluir este livro permanentemente",
  moveToRecycleBin: "Mova este livro para a lixeira",
  removeBook: "excluir livro",
  empty: "A lista de livros está vazia",
  needScore: "Por favor insira a classificação",
  recycleNoRecord: "Não há registro de dados excluídos na Lixeira!",
  uploadBookTip: "Clique no botão de upload para fazer upload de um livro localmente e comece a mergulhar no mar de livros!",
  getBookFail: "Falha ao obter o livro",
  getBookListFail: "Falha ao ler a lista de livros",
  getBookReadTimeFail: "Falha ao ler a lista de horários de leitura do livro",
  getBookReadTimeListFail: "Falha ao ler a lista de horários de leitura do livro",
  importBookFail: "Falha ao importar livros",
  recordBookTimeFail: "Falha ao registrar o tempo de leitura",
  needAuthor: "Por favor insira o nome do autor",
  uploadCoverFail: "Falha ao carregar a capa",
  jumpToBookList: "Ir para a lista de livros",
  jumpToLastPosition: "Ir para a última posição de leitura"
};
const note = {
  addNoteFail: "Falha ao adicionar nota",
  getNoteFail: "Falha ao ler a lista de notas",
  getNoteListFail: "Falha ao ler a lista de notas",
  empty: "A lista de notas está vazia",
  emptyNoteListTip: "Na interface da lista de livros, selecione um livro para ler, selecione o texto que atrai sua atenção e insira suas ideias na caixa de diálogo pop-up",
  forceRemove: "Exclua esta nota permanentemente",
  noteDetail: "Detalhes da nota",
  removeSuccess: "Nota excluída com sucesso",
  sureRemove: "Confirmar exclusão da nota",
  placeholder: "Escreva seus pensamentos neste momento...",
  write: "escreva ideias"
};
const tag = {
  needTag: "Por favor insira a etiqueta",
  removeTagSuccess: "Tag excluída com sucesso"
};
const statistics = {
  bookUnit: "Livro",
  noteUnit: "Capítulo",
  readTime: "duração",
  readTimeUnit: "Hora",
  readTotalTime: "duração total",
  readed: "Tenho lido",
  reading: "leitura",
  thisMouthNote: "Notas para este mês",
  thisMouthReadTime: "Duração deste mês",
  thisMouthReaded: "Leia este mês",
  thisMouthReading: "Lendo este mês",
  total: "A quantidade total",
  myLove: "meu favorito",
  currentReading: "Lendo recentemente"
};
const line = {
  beeline: "linha reta",
  marker: "marcador",
  wavy: "linhas onduladas"
};
const pdf = {
  auto: "Escalonamento automático",
  pageActual: "tamanho atual",
  pageFit: "ajustar à página",
  pageWidth: "Ajustar à largura da página"
};
const pt = {
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
  pt as default,
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
