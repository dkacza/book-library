import { createContext, useEffect, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';

const BookContext = createContext({});

const INITIAL_BOOK_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;
const processBooks = (books) => {
  return books.map((book) => ({
    ...book,
    authors: book.authors.map((author) => author.name),
  }));
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookQuery, setBookQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_BOOK_PAGE);
  const [errorMsg, setErrorMsg] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const { width, height } = useWindowDimensions();

  const fetchAllBooks = (page) => {
    axios
      .get(`/books?page=${page}&limit=${limitPerPage}&${bookQuery}`)
      .then((res) => {
        const booksResponse = res.data.data.books;
        setBooks(processBooks(booksResponse));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);
      })
      .catch((err) => {
        const errorMsg = err.response.data.message;
        setErrorMsg(errorMsg);
      });
  };

  // Set limit per page on render and widow resize
  useEffect(() => {
    if (width <= 2000) setLimitPerPage(LIMIT_1080P);
    if (width > 2000) setLimitPerPage(LIMIT_1440P);
    if (width > 2600) setLimitPerPage(LIMIT_4K);
  }, [width, height]);

  // When query is changed set page to 1
  useEffect(() => {
    setCurrentPage(INITIAL_BOOK_PAGE);
  }, [bookQuery]);

  // When
  // - New page limit is set
  // - Book query is updated
  // - Page is changed
  // Get the new book data (no query applied)
  useEffect(() => {
    fetchAllBooks(currentPage);
  }, [limitPerPage, bookQuery, currentPage]);

  return (
    <BookContext.Provider
      value={{
        books,
        currentPage,
        paginationData,
        errorMsg,
        setBookQuery,
        setCurrentPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;
