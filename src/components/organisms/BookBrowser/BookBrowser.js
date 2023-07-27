import React, { useEffect, useState } from 'react';
import Table from 'components/organisms/Table/Table';
import Filters from 'components/organisms/Filters/Filters';
import Wrapper from 'components/organisms/BookBrowser/BookBrowser.styles';
import axios from 'api/axios';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'status'];
const BookBrowser = () => {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState({
    currentPage: 1,
    limit: 10,
  });

  useEffect(() => {
    axios
      .get(`/books?page=${pages.currentPage}&limit=${pages.limit}`)
      .then((res) => {
        const booksResponse = res.data.data.books;
        const preparedBooks = booksResponse.map(book => {
          const newBookObj = {
            ...book,
            authors: book.authors.map(author => author.name).join('\n'),
            status: book.currentStatus
          }
          delete newBookObj.currentStatus;
          return newBookObj;
        })
        setBooks(preparedBooks);
        console.log(books)
      })
      .catch((err) => console.log(`Could not fetch the data about books`));
  }, [pages]);

  return (
    <Wrapper>
      <Table columnNames={columnNames} columnCodes={columnCodes} data={books} />
      <Filters />
      <div className="pagination">Pagination</div>
    </Wrapper>
  );
};

export default BookBrowser;
