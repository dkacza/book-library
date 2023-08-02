const flattenBookAuthors = function (books) {
  return books.map(book => ({
    ...book,
    authors: book.authors.map((author) =>  author.name).join(' '),
  }));
}

export default flattenBookAuthors;