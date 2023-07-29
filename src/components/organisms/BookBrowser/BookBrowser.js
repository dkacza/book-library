import React, { useEffect, useState } from 'react';
import Table from 'components/organisms/Table/Table';
import Filters from 'components/organisms/Filters/Filters';
import Wrapper from 'components/organisms/BookBrowser/BookBrowser.styles';
import axios from 'api/axios';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'status'];
const LIMIT_PER_PAGE = 10;
const INITIAL_PAGE = 1;
const BookBrowser = () => {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState({});
  const getBookData = (page, limit) => {
    axios
      .get(`/books?page=${page}&limit=${limit}`)
      .then((res) => {
        const booksResponse = res.data.data.books;
        const preparedBooks = booksResponse.map((book) => {
          const newBookObj = {
            ...book,
            authors: book.authors.map((author) => author.name).join('\n'),
            status: book.currentStatus,
          };
          delete newBookObj.currentStatus;
          return newBookObj;
        });
        setBooks(preparedBooks);

        const paginationResponse = res.data.data.pagination;
        setPages(paginationResponse)
      })
      .catch((err) => console.log(`Could not fetch the data about books`));
  }

  useEffect(() => {
    getBookData(INITIAL_PAGE, LIMIT_PER_PAGE)
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > pages.totalPages || newPage < 1) {
      return;
    }
    getBookData(newPage, LIMIT_PER_PAGE);
  };

  return (
    <Wrapper>
      <Table columnNames={columnNames} columnCodes={columnCodes} data={books} />
      <Filters />
      <div className="pagination">
        <p>
          {pages.currentStart} - {pages.currentEnd} of {pages.total} items{' '}
        </p>
        <button className="first" onClick={() => handlePageChange(1)}>
          First
        </button>
        <button className="previous" onClick={() => handlePageChange(pages.currentPage - 1)}>
          Previous
        </button>
        <button className="next" onClick={() => handlePageChange(pages.currentPage + 1)}>
          Next
        </button>
        <button className="last" onClick={() => handlePageChange(pages.totalPages)}>
          Last
        </button>
      </div>
    </Wrapper>
  );
};

export default BookBrowser;
