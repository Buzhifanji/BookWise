export const makePDF = async (file) => {
  const book = { type: 'pdf' }

  book.destroy = () => {}

  return book
}
