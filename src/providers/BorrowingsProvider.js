import {createContext, useContext, useEffect, useState} from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';
import axios from 'api/axios';
import AuthContext from 'providers/AuthProvider';
import providerHelpers from 'utils/providerHelpers';

const BorrowingsContext = createContext({});

const INITIAL_HISTORY_PAGE = 1;
const LIMIT_1080P = 10;
const LIMIT_1440P = 15;
const LIMIT_4K = 20;

const processBorrowing = borrowing => {
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

export const BorrowingsProvider = ({children}) => {
  const {auth} = useContext(AuthContext);

  const [history, setHistory] = useState([]);
  const [historyQuery, setHistoryQuery] = useState('');
  const [paginationData, setPaginationData] = useState({});
  const [currentPage, setCurrentPage] = useState(INITIAL_HISTORY_PAGE);
  const [limitPerPage, setLimitPerPage] = useState(LIMIT_1080P);
  const {width, height} = useWindowDimensions();
  const [authorizedHistory, setAuthorizedHistory] = useState(false);

  const [borrowingsListStatus, setBorrowingsListStatus] = useState(
    providerHelpers.INITIAL_STATUS,
  );
  const unsetBorrowingsListStatus = () => {
    setBorrowingsListStatus(providerHelpers.INITIAL_STATUS);
  };
  const fetchLoggedInUsersBorrowings = page => {
    unsetBorrowingsListStatus();
    axios
      .get(
        `users/me/history?page=${page}&limit=${limitPerPage}&${historyQuery}`,
      )
      .then(res => {
        const historyResponse = res.data.data.rentals;
        setHistory(historyResponse.map(processBorrowing));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        providerHelpers.setSuccessStatus(
          setBorrowingsListStatus,
          'Borrowings successfully fetched',
        );
      })
      .catch(err => {
        const errorMsgResponse = err.response.data.message;
        providerHelpers.setErrorStatus(
          setBorrowingsListStatus,
          errorMsgResponse,
        );
      });
  };
  const fetchAllBorrowings = page => {
    unsetBorrowingsListStatus();
    axios
      .get(`rentals?page=${page}&limit=${limitPerPage}&${historyQuery}`)
      .then(res => {
        const historyResponse = res.data.data.rentals;
        setHistory(historyResponse.map(processBorrowing));

        const paginationResponse = res.data.data.pagination;
        setPaginationData(paginationResponse);

        providerHelpers.setSuccessStatus(
          setBorrowingsListStatus,
          'Borrowings successfully fetched',
        );
      })
      .catch(err => {
        const errorMsgResponse = err.response.data.message;
        providerHelpers.setErrorStatus(
          setBorrowingsListStatus,
          errorMsgResponse,
        );
      });
  };

  const [borrowingByIdStatus, setBorrowingByIdStatus] = useState(
    providerHelpers.INITIAL_STATUS,
  );
  const unsetBorrowingByIdStatus = () => {
    setBorrowingByIdStatus(providerHelpers.INITIAL_STATUS);
  };
  const getBorrowingById = async borrowingId => {
    unsetBorrowingByIdStatus();
    let borrowing = history.find(borrowing => borrowing._id === borrowingId);
    if (borrowing) {
      providerHelpers.setSuccessStatus(
        setBorrowingByIdStatus,
        'Borrowing found',
      );
      return borrowing;
    }
    try {
      const response = await axios.get(`/rentals/${borrowingId}`);
      const borrowing = processBorrowing(response.data.data.rental);
      providerHelpers.setSuccessStatus(
        setBorrowingByIdStatus,
        'Borrowing fetched successfully',
      );
      return borrowing;
    } catch (err) {
      const errorMsgResponse = err.response.data.message;
      providerHelpers.setErrorStatus(setBorrowingByIdStatus, errorMsgResponse);
      return {};
    }
  };

  const [returnedBorrowingStatus, setReturnedBorrowingStatus] = useState(
    providerHelpers.INITIAL_STATUS,
  );
  const unsetReturnedBorrowingStatus = () => {
    setReturnedBorrowingStatus(providerHelpers.INITIAL_STATUS);
  };
  const patchBorrowingAsReturned = async borrowingId => {
    unsetReturnedBorrowingStatus();
    try {
      const response = await axios.patch(`/rentals/${borrowingId}`, {
        currentStatus: 'returned',
      });
      providerHelpers.setSuccessStatus(
        setReturnedBorrowingStatus,
        'Book successfully returned',
      );
      return processBorrowing(response.data.data.rental);
    } catch (err) {
      const errorMsgResponse = err.response.data.message;
      providerHelpers.setErrorStatus(
        setReturnedBorrowingStatus,
        errorMsgResponse,
      );
      return {};
    }
  };

  const [createBorrowingStatus, setCreateBorrowingStatus] = useState(
    providerHelpers.INITIAL_STATUS,
  );
  const unsetCreateBorrowingStatus = () => {
    setCreateBorrowingStatus(providerHelpers.INITIAL_STATUS);
  };
  const postBorrowing = async (bookId, userId) => {
    try {
      const response = await axios.post('/rentals', {
        user: userId,
        book: bookId,
      });
      providerHelpers.setSuccessStatus(
        setCreateBorrowingStatus,
        'Borrowing successfully indexed',
      );
      return processBorrowing(response.data.data.rental);
    } catch (err) {
      const errorMsgResponse = err.response.data.message;
      providerHelpers.setErrorStatus(
        setCreateBorrowingStatus,
        errorMsgResponse,
      );
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
        currentPage,
        paginationData,
        authorizedHistory,
        setHistoryQuery,
        setCurrentPage,

        history,
        borrowingsListStatus,
        unsetBorrowingsListStatus,

        getBorrowingById,
        borrowingByIdStatus,
        unsetBorrowingByIdStatus,

        patchBorrowingAsReturned,
        returnedBorrowingStatus,
        unsetReturnedBorrowingStatus,

        postBorrowing,
        createBorrowingStatus,
        unsetCreateBorrowingStatus,
      }}
    >
      {children}
    </BorrowingsContext.Provider>
  );
};
export default BorrowingsContext;
