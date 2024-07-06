const menu = {
  book: "sách",
  note: "Ghi chú",
  setting: "Cài đặt",
  recycleBin: "thùng rác"
};
const setting = {
  chooseLanguage: "Chọn một ngôn ngữ",
  chooseTheme: "Chọn chủ đề",
  language: "ngôn ngữ",
  theme: "chủ đề",
  userSetting: "thiết lập người dùng",
  autoHighlightDesc: "Sau khi mở, khi văn bản được chọn, nó sẽ tự động được tô sáng.",
  autoHighlightTitle: "Có tự động đánh dấu hay không",
  bookMode: "chế độ giá sách",
  mode: "người mẫu",
  noteShowClassDesc: "Sau khi đóng, kiểu tô sáng sẽ chỉ được hiển thị khi trượt chuột qua nó.",
  noteShowClassTitle: "Ghi chú có hiển thị kiểu đánh dấu hay không",
  openNewDesc: "Nếu không, người đọc sẽ chỉ ở trang hiện tại.",
  openNewTitle: "Người đọc có mở trang mới hay không",
  openRecycleBinDesc: "Đóng Thùng rác Khi bạn xóa một cuốn sách, nó sẽ bị xóa vĩnh viễn thay vì được chuyển vào Thùng rác.",
  openRecycleBinTitle: "Bật chức năng thùng rác",
  readMode: "chế độ đọc",
  rememberPositionDesc: "Sau khi mở ra, vào lại giao diện đọc sẽ tự động nhảy về vị trí đọc cuối cùng.",
  rememberPositionTitle: "Có nhớ vị trí đọc cuối cùng hay không",
  autoHighlight: "Tự động đánh dấu"
};
const unfound = {
  desc: "Xin lỗi, chúng tôi không thể tìm thấy trang này. \nBạn sẽ tìm thấy rất nhiều điều để khám phá trên trang chủ.",
  tip: "Quay lại trang chủ",
  title: "Trang này bị thiếu"
};
const file = {
  upload: "tải tập tin lên",
  choose: "Chọn một tài liệu",
  dragFile: "Kéo và thả tập tin vào đây",
  exist: "Tập tin đã tồn tại",
  releaseMouse: "Thả chuột",
  uploadSuccess: "Tải lên thành công",
  supportFormat: "Các định dạng được hỗ trợ:"
};
const common = {
  or: "hoặc",
  addBookshelf: "Thêm giá sách",
  addLove: "thêm mục yêu thích",
  detail: "Chi tiết",
  edit: "biên tập",
  forceRemove: "xóa vĩnh viễn",
  remove: "xóa bỏ",
  removeLove: "Xóa mục yêu thích",
  restore: "hồi phục",
  score: "điểm",
  unknown: "không xác định",
  close: "Khép kín",
  copySuccess: "Đã sao chép thành công",
  cancel: "Hủy bỏ",
  sure: "xác nhận",
  minute: "điểm",
  addSuccess: "Thêm thành công",
  empty: "Trống",
  removeSuccess: "Đã xóa thành công",
  removeFail: "không thể xóa",
  restoreFail: "Khôi phục không thành công",
  editFail: "Chỉnh sửa không thành công",
  updateFail: "Cập nhật không thành công",
  add: "Thêm vào",
  copy: "sao chép",
  prewView: "Trang trước",
  getFirstView: "Đã là trang đầu tiên",
  getLastView: "Đã là trang cuối cùng",
  nextView: "Trang tiếp theo",
  comeFrom: "từ"
};
const readMode = {
  double: "Chế độ trang đôi",
  scroll: "chế độ cuộn",
  section: "Chế độ chương"
};
const bookMode = {
  bookshelf: "chế độ giá sách",
  card: "chế độ thẻ",
  list: "chế độ danh sách"
};
const book = {
  author: "tác giả",
  bookshelf: "giá sách",
  createTime: "thời gian tạo",
  detail: "Chi tiết sách",
  highlightLen: "Số điểm nổi bật",
  name: "tên sách",
  notesLen: "Số lượng ghi chú",
  openCount: "số lần đọc",
  page: "Số trang",
  publishTime: "Ngày xuất bản",
  publisher: "Nhà xuất bản",
  readProgress: "tiến độ đọc",
  score: "điểm",
  size: "kích cỡ",
  totalReadTime: "Tổng thời gian đọc",
  updateTime: "Cập nhật thời gian",
  readDetailFail: "Không đọc được chi tiết sách",
  thisReadTime: "Lần đọc này",
  addToBookshelfFail: "Thêm vào giá sách không thành công",
  addToBookshelfSuccess: "Đã thêm vào giá sách thành công",
  addToBookshelf: "Thêm vào giá sách",
  getBookshelfFail: "Không lấy được giá sách",
  neeSelectBookshelf: "Hãy chọn kệ sách",
  needBookshelfName: "Vui lòng nhập tên giá sách",
  cover: "bìa sách",
  needAuhor: "Vui lòng nhập tên tác giả",
  needBookName: "Vui lòng nhập tên sách",
  uploadCover: "Tải ảnh bìa lên",
  uploadCoverFial: "Không thể tải lên bìa",
  forceRemove: "Xóa cuốn sách này vĩnh viễn",
  moveToRecycleBin: "Chuyển cuốn sách này vào thùng rác",
  removeBook: "xóa sách",
  empty: "Danh sách sách trống",
  needScore: "Vui lòng nhập đánh giá",
  recycleNoRecord: "Không có bản ghi dữ liệu đã xóa trong Thùng rác!",
  uploadBookTip: "Nhấp vào nút tải lên để tải sách lên cục bộ và sau đó bắt đầu đắm mình trong biển sách!",
  getBookFail: "Không lấy được sách",
  getBookListFail: "Không đọc được danh sách sách",
  getBookReadTimeFail: "Không đọc được danh sách thời gian đọc sách",
  getBookReadTimeListFail: "Không đọc được danh sách thời gian đọc sách",
  importBookFail: "Không thể nhập sách",
  recordBookTimeFail: "Không thể ghi lại thời gian đọc",
  needAuthor: "Vui lòng nhập tên tác giả",
  uploadCoverFail: "Không thể tải lên bìa",
  jumpToBookList: "Chuyển đến danh sách sách",
  jumpToLastPosition: "Chuyển đến vị trí đọc cuối cùng"
};
const note = {
  addNoteFail: "Không thể thêm ghi chú",
  getNoteFail: "Không đọc được danh sách ghi chú",
  getNoteListFail: "Không đọc được danh sách ghi chú",
  empty: "Danh sách ghi chú trống",
  emptyNoteListTip: "Trong giao diện danh sách sách, bạn chọn cuốn sách cần đọc, sau đó chọn đoạn văn bản thu hút sự chú ý của bạn và nhập suy nghĩ của bạn vào hộp thoại hiện lên",
  forceRemove: "Xóa ghi chú này vĩnh viễn",
  noteDetail: "Ghi chú chi tiết",
  removeSuccess: "Đã xóa ghi chú thành công",
  sureRemove: "Xác nhận xóa ghi chú",
  placeholder: "Hãy viết ra suy nghĩ của bạn lúc này...",
  write: "viết ý tưởng",
  myNote: "ghi chú của tôi"
};
const tag = {
  needTag: "Vui lòng nhập thẻ",
  removeTagSuccess: "Đã xóa thẻ thành công"
};
const statistics = {
  bookUnit: "Sách",
  noteUnit: "chương",
  readTime: "khoảng thời gian",
  readTimeUnit: "Giờ",
  readTotalTime: "Tổng thời gian",
  readed: "Đã đọc",
  reading: "đọc",
  thisMouthNote: "Ghi chú cho tháng này",
  thisMouthReadTime: "Thời gian của tháng này",
  thisMouthReaded: "Đọc trong tháng này",
  thisMouthReading: "Đọc tháng này",
  total: "Tổng số lượng",
  myLove: "yêu thích của tôi",
  currentReading: "Đọc gần đây"
};
const line = {
  beeline: "đường thẳng",
  marker: "đánh dấu",
  wavy: "đường lượn sóng"
};
const pdf = {
  auto: "Tự động chia tỷ lệ",
  pageActual: "Kích thước thực sự",
  pageFit: "phù hợp với trang",
  pageWidth: "Vừa với chiều rộng trang"
};
const vi = {
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
  vi as default,
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
