import {createContext, useContext, useEffect, useState} from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';
import AuthContext from 'providers/AuthProvider';
import isEmptyObject from 'utils/isEmptyObject';
import providerHelpers from 'utils/providerHelpers';

const BookContext = createContext({});

const INITIAL_BOOK_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;

const processBook = book => {
  book.publicationDate = book.publicationDate.split('T')[0];
  return book;
};

export const BookProvider = ({children}) => {
  const [books, setBooks] = useState([]);
  const [bookQuery, setBookQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_BOOK_PAGE);
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const {width, height} = useWindowDimensions();
  const {auth} = useContext(AuthContext);

  const [allBooksStatus, setAllBooksStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetAllBookStatus = () => {
    setAllBooksStatus(providerHelpers.INITIAL_STATUS);
  };
  const fetchAllBooks = page => {
    unsetAllBookStatus();
    axios
      .get(`/books?page=${page}&limit=${limitPerPage}&${bookQuery}`)
      .then(res => {
        const booksResponse = res.data.data.books;
        setBooks(booksResponse.map(processBook));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        providerHelpers.setSuccessStatus(setAllBooksStatus, 'Books successfully fetched');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setAllBooksStatus, errorMsgResponse);
        setBooks([]);
      });
  };

  // Return a book from the currently loaded ones
  // If it cannot be found, fetch it
  const [bookByIdStatus, setBookByIdStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetBookByIdStatus = () => {
    setBookByIdStatus(providerHelpers.INITIAL_STATUS);
  };
  const getBookById = async id => {
    unsetBookByIdStatus();
    let book = books.find(book => book._id === id);
    if (book) {
      providerHelpers.setSuccessStatus(setBookByIdStatus, 'Book successfully selected');
      return book;
    }

    try {
      const bookResponse = await axios.get(`books/${id}`);
      providerHelpers.setSuccessStatus(setBookByIdStatus, 'Book successfully fetched');
      return processBook(bookResponse.data.data.book);
    } catch (err) {
      const errorMsgResponse = err?.response?.data?.message || 'Connection error';
      providerHelpers.setErrorStatus(setBookByIdStatus, errorMsgResponse);
      return {};
    }
  };

  const [updateBookStatus, setUpdateBookStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetUpdateBookStatus = () => {
    setUpdateBookStatus(providerHelpers.INITIAL_STATUS);
  };
  const patchBookDetails = async (id, requestBody) => {
    unsetUpdateBookStatus();
    axios
      .patch(`books/${id}`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        const updatedBookResponse = res.data.data.book;
        const updatedBooks = [...books];
        for (let i = 0; i < updatedBooks.length; i++) {
          if (updatedBooks[i]._id === id) updatedBooks[i] = processBook(updatedBookResponse);
        }
        setBooks(updatedBooks);
        providerHelpers.setSuccessStatus(setUpdateBookStatus, 'Book details successfully updated');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setUpdateBookStatus, errorMsgResponse);
      });
  };

  const [postBookStatus, setPostBookStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetPostBookStatus = () => {
    setPostBookStatus(providerHelpers.INITIAL_STATUS);
  };
  const postBook = requestBody => {
    unsetPostBookStatus();
    axios
      .post(`books`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        providerHelpers.setSuccessStatus(setPostBookStatus, 'Book successfully created');
      })
      .catch(err => {
        const errorMsgResponse = err?.response?.data?.message || 'Connection error';
        providerHelpers.setErrorStatus(setPostBookStatus, errorMsgResponse);
      });
  };

  const [searchedBooksStatus, setSearchedBooksStatus] = useState(providerHelpers.INITIAL_STATUS);
  const unsetSearchedBookStatus = () => {
    setSearchedBooksStatus(providerHelpers.INITIAL_STATUS);
  };
  const searchForBook = async searchQuery => {
    unsetSearchedBookStatus();
    try {
      const response = await axios.get(`/books?currentStatus=available&search=${searchQuery}`);
      providerHelpers.setSuccessStatus(setSearchedBooksStatus, 'Books found');
      return response.data.data.books.map(processBook);
    } catch (err) {
      const errorMsgResponse = err?.response?.data?.message || 'Connection error';
      providerHelpers.setErrorStatus(setSearchedBooksStatus, errorMsgResponse);
      return [];
    }
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
    if (!isEmptyObject(auth)) {
      fetchAllBooks(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitPerPage, bookQuery, currentPage, auth]);

  useEffect(() => {
    setBookQuery('');
  }, [auth]);

  return (
    <BookContext.Provider
      value={{
        currentPage,
        paginationData,
        setBookQuery,
        setCurrentPage,

        books,
        allBooksStatus,
        unsetAllBookStatus,

        getBookById,
        bookByIdStatus,
        unsetBookByIdStatus,

        patchBookDetails,
        updateBookStatus,
        unsetUpdateBookStatus,

        postBook,
        postBookStatus,
        unsetPostBookStatus,

        searchForBook,
        searchedBooksStatus,
        unsetSearchedBookStatus,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;
