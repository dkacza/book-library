import { createContext, useContext, useEffect, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';
import AuthContext from 'providers/AuthProvider';
import isEmptyObject from 'utils/isEmptyObject';

const BookContext = createContext({});

const INITIAL_BOOK_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;

const INITIAL_STATUS = {
  error: '',
  confirm: '',
};

const setSuccessStatus = (setter, message) => {
  setter({
    error: '',
    success: message,
  });
};
const setErrorStatus = (setter, message) => {
  setter({
    error: message,
    success: '',
  });
};
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
  const { auth } = useContext(AuthContext);

  const [allBooksStatus, setAllBooksStatus] = useState(INITIAL_STATUS);
  const fetchAllBooks = (page) => {
    setAllBooksStatus(INITIAL_STATUS);
    axios
      .get(`/books?page=${page}&limit=${limitPerPage}&${bookQuery}`)
      .then((res) => {
        const booksResponse = res.data.data.books;
        setBooks(booksResponse.map(processBook));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        setSuccessStatus(setAllBooksStatus, 'Books successfully fetched');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorStatus(setAllBooksStatus, errorMsgResponse);
      });
  };

  // Return a book from the currently loaded ones
  // If it cannot be found, fetch it
  const [bookByIdStatus, setBookByIdStatus] = useState(INITIAL_STATUS);
  const getBookById = async (id) => {
    setBookByIdStatus(INITIAL_STATUS);
    let book = books.find((book) => book._id === id);
    if (book) {
      setSuccessStatus(setBookByIdStatus, 'Book successfully selected');
      return book;
    }

    try {
      const bookResponse = await axios.get(`books/${id}`);
      setSuccessStatus(setBookByIdStatus, 'Book successfully fetched');
      return processBook(bookResponse.data.data.book);
    } catch (err) {
      setErrorStatus(setBookByIdStatus, err.response.data.message);
      return {};
    }
  };

  const [updateBookStatus, setUpdateBookStatus] = useState(INITIAL_STATUS);
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
        setSuccessStatus(setUpdateBookStatus, 'Book details successfully updated');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorStatus(setUpdateBookStatus, errorMsgResponse);
      });
  };
  const unsetUpdateBookStatus = () => {
    setUpdateBookStatus(INITIAL_STATUS);
  };

  const [postBookStatus, setPostBookStatus] = useState(INITIAL_STATUS);
  const postBook = (requestBody) => {
    setPostBookStatus(INITIAL_STATUS);
    axios
      .post(`books`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setSuccessStatus(setPostBookStatus, 'Book successfully created');
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorStatus(setPostBookStatus, errorMsgResponse);
      });
  };

  const [searchedBooksStatus, setSearchedBooksStatus] = useState(INITIAL_STATUS);
  const searchForBook = async (searchQuery) => {
    unsetSearchedBookStatus();
    try {
      const response = await axios.get(`/books?currentStatus=available&search=${searchQuery}`);
      setSuccessStatus(setSearchedBooksStatus, 'Books found');
      return response.data.data.books.map(processBook);
    } catch (err) {
      const errorMsgResponse = err.response.data.message;
      setErrorStatus(setSearchedBooksStatus, errorMsgResponse);
      return [];
    }
  };
  const unsetSearchedBookStatus = () => {
    setSearchedBooksStatus(INITIAL_STATUS);
  }

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
    if (!isEmptyObject(auth)) {
      fetchAllBooks(currentPage);
    }
  }, [limitPerPage, bookQuery, currentPage, auth]);

  return (
    <BookContext.Provider
      value={{
        currentPage,
        paginationData,
        setBookQuery,
        setCurrentPage,

        books,
        allBooksStatus,
        getBookById,
        bookByIdStatus,

        patchBookDetails,
        updateBookStatus,
        unsetUpdateBookStatus,

        postBook,
        postBookStatus,

        searchedBooksStatus,
        unsetSearchedBookStatus,
        searchForBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;
