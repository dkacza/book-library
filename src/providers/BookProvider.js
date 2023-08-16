import { createContext, useEffect, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';

const BookContext = createContext({});

const INITIAL_BOOK_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;
const processBook = (book) => {
  book.publicationDate = book.publicationDate.split('T')[0];
  return book;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookQuery, setBookQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_BOOK_PAGE);
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const { width, height } = useWindowDimensions();

  // Each used endpoint contains it error and confirmation message.
  const [fetchAllBookErrorMsg, setFetchAllBookErrorMsg] = useState('');
  const [fetchAllBooksConfirmationMsg, setFetchAllBooksConfirmationMsg] = useState('');

  const [getBookByIdErrorMsg, setGetBookByIdErrorMsg] = useState('');
  const [getBookByIdConfirmationMsg, setGetBookByIdConfirmationMsg] = useState('');

  const [patchBookDetailsErrorMsg, setPatchBookDetailsErrorMsg] = useState('');
  const [patchBookDetailsConfirmationMsg, setPatchBookDetailsConfirmationMsg] = useState('');

  const [postBookErrorMsg, setPostBookErrorMsg] = useState('');
  const [postBookConfirmationMsg, setPostBookConfirmationMsg] = useState('');

  const fetchAllBooks = (page) => {
    axios
      .get(`/books?page=${page}&limit=${limitPerPage}&${bookQuery}`)
      .then((res) => {
        const booksResponse = res.data.data.books;
        setBooks(booksResponse.map(processBook));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        setFetchAllBooksConfirmationMsg('Books successfully fetched');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setFetchAllBookErrorMsg(errorMsgResponse);
      });
  };

  // Return a book from the currently loaded ones
  // If it cannot be found, fetch it
  const getBookById = async (id) => {
    let book = books.find((book) => book._id === id);
    setGetBookByIdConfirmationMsg('Book successfully selected');
    if (book) return book;

    try {
      const bookResponse = await axios.get(`books/${id}`);
      setGetBookByIdConfirmationMsg('Book successfully fetched');
      return processBook(bookResponse.data.data.book);
    } catch (err) {
      setGetBookByIdErrorMsg(err.response.data.message);
      return {};
    }
  };

  const patchBookDetails = async (id, requestBody) => {
    axios
      .patch(`books/${id}`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const updatedBookResponse = res.data.data.book;
        const updatedBooks = [...books];
        for (let i = 0; i < updatedBooks.length; i++) {
          if (updatedBooks[i]._id === id) updatedBooks[i] = processBook(updatedBookResponse);
        }
        setBooks(updatedBooks);
        setPatchBookDetailsConfirmationMsg('Book details successfully updated');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setPatchBookDetailsErrorMsg(errorMsgResponse);
      });
  };

  const postBook = (requestBody) => {
    axios
      .post(`books`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setPostBookConfirmationMsg('Book successfully created');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setPostBookErrorMsg(errorMsgResponse);
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
        setBookQuery,
        setCurrentPage,

        fetchAllBooksConfirmationMsg,
        fetchAllBookErrorMsg,

        getBookById,
        getBookByIdConfirmationMsg,
        getBookByIdErrorMsg,

        patchBookDetails,
        patchBookDetailsConfirmationMsg,
        patchBookDetailsErrorMsg,

        postBook,
        postBookConfirmationMsg,
        postBookErrorMsg,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;
