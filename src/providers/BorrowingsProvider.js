import { createContext, useContext, useEffect, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';
import AuthContext from 'providers/AuthProvider';

const BorrowingsContext = createContext({});

const INITIAL_HISTORY_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;
const processBorrowing = (borrowing) => {
  if (borrowing.firstName && borrowing.lastName) {
    borrowing.fullName = borrowing.firstName + ' ' + borrowing.lastName;
  }
  if (borrowing.returnDate) {
    borrowing.returnDate = borrowing.returnDate.split('T')[0];
  }
  borrowing.startDate = borrowing.startDate.split('T')[0];
  borrowing.expirationDate = borrowing.expirationDate.split('T')[0];
  return borrowing;
};

export const BorrowingsProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);

  const [history, setHistory] = useState([]);
  const [historyQuery, setHistoryQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_HISTORY_PAGE);
  const [errorMsg, setErrorMsg] = useState('');
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const { width, height } = useWindowDimensions();
  const [authorizedHistory, setAuthorizedHistory] = useState(false);

  const fetchLoggedInUsersBorrowings = (page) => {
    axios
      .get(`users/me/history?page=${page}&limit=${limitPerPage}&${historyQuery}`)
      .then((res) => {
        const historyResponse = res.data.data.rentals;
        setHistory(historyResponse.map(processBorrowing));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorMsg(errorMsgResponse);
      });
  };
  const fetchAllBorrowings = (page) => {
    axios
      .get(`rentals?page=${page}&limit=${limitPerPage}&${historyQuery}`)
      .then((res) => {
        const historyResponse = res.data.data.rentals;
        setHistory(historyResponse.map(processBorrowing));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);
      })
      .catch((err) => {
        const errorMsgResponse = err.response.data.message;
        setErrorMsg(errorMsgResponse);
      });
  };

  const [getBorrowingByIdErrorMsg, setGetBorrowingByIdErrorMsg] = useState('');
  const [getBorrowingByIdConfirmationMsg, setGetBorrowingByIdConfirmationMsg] = useState('');
  const getBorrowingById = async (borrowingId) => {
    let borrowing = history.find((borrowing) => borrowing._id === borrowingId);
    if (borrowing) {
      setGetBorrowingByIdConfirmationMsg('Borrowing found');
      return borrowing;
    }
    try {
      const response = await axios.get(`/rentals/${borrowingId}`);
      const borrowing = processBorrowing(response.data.data.rental);
      return borrowing;
    } catch (err) {
      const errorMsgResponse = err.response.data.message;
      setGetBorrowingByIdErrorMsg(errorMsgResponse);
      return {};
    }
  };

  const patchBorrowingAsReturned = async (borrowingId) => {
    axios
      .patch(`/rentals/${borrowingId}`, { currentStatus: 'returned' })
      .then((res) => {
        return 12;
      })
      .catch((err) => {
        return 12;
      });
  };

  const postBorrowing = async (bookId, userId) => {
    try {
      const response = await axios.post('/rentals', { user: userId, book: bookId });
      console.log(response);
      return processBorrowing(response.data.data.rental);
    } catch(err) {
      console.log(':(');
      return {};
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
    setCurrentPage(INITIAL_HISTORY_PAGE);
  }, [historyQuery]);

  // When
  // - New page limit is set
  // - History query is updated
  // - Page is changed
  // - Authentication is changed
  // Get the new book data (no query applied)
  useEffect(() => {
    if (auth.role === 'user') {
      setAuthorizedHistory(false);
      fetchLoggedInUsersBorrowings(currentPage);
    } else if (auth.role === 'librarian' || auth.role === 'admin') {
      setAuthorizedHistory(true);
      fetchAllBorrowings(currentPage);
    }
  }, [auth, limitPerPage, historyQuery, currentPage]);

  return (
    <BorrowingsContext.Provider
      value={{
        history,
        currentPage,
        paginationData,
        authorizedHistory,
        errorMsg,
        setHistoryQuery,
        setCurrentPage,
        getBorrowingById,
        patchBorrowingAsReturned,
        postBorrowing,
      }}
    >
      {children}
    </BorrowingsContext.Provider>
  );
};
export default BorrowingsContext;