import { useContext, useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import BookContext from 'providers/BookProvider';
import BorrowingsContext from 'providers/BorrowingsProvider';
import UsersContext from 'providers/UsersProvider';

const API_CALL_DELAY = 600;

const UseBorrowingManager = (selectedUser, setSelectedUser) => {
  const [currentBorrowings, setCurrentBorrowings] = useState([]);
  const [returnSelected, setReturnSelected] = useState(true);
  const [booksSearchResult, setBooksSearchResult] = useState(undefined);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [borrowingManagerError, setBorrowingManagerError] = useState('');
  const [borrowingManagerSuccess, setBorrowingManagerSuccess] = useState('');

  const { searchForBook, searchedBookStatus, unsetSearchedBookStatus } = useContext(BookContext);
  const {
    getBorrowingById,
    borrowingByIdStatus,
    unsetBorrowingByIdStatus,
    patchBorrowingAsReturned,
    returnedBorrowingStatus,
    unsetReturnedBorrowingStatus,
    postBorrowing,
    createBorrowingStatus,
    unsetCreateBorrowingStatus,
  } = useContext(BorrowingsContext);
  const {updateArrayWithNewUser} = useContext(UsersContext);

  const getBooksFromProvider = async () => {
    const searchResult = await searchForBook(bookSearchQuery);
    setBooksSearchResult(searchResult);
  };

  useDebounce(getBooksFromProvider, API_CALL_DELAY, [bookSearchQuery]);

  const toggleAction = () => {
    const newAction = !returnSelected;
    setReturnSelected(newAction);
    setBooksSearchResult(undefined);
  };
  const handleBookBorrow = async (e, bookId) => {
    const newBorrowing = await postBorrowing(bookId, selectedUser._id);
    const modifiedSelectedUser = {
      ...selectedUser,
      rentals: [...selectedUser.rentals, newBorrowing._id],
    };
    modifiedSelectedUser.eligible = modifiedSelectedUser.rentals.length < 3;
    setSelectedUser(modifiedSelectedUser);

    // TODO replace the all users array
    updateArrayWithNewUser(modifiedSelectedUser);

    getBooksFromProvider();
  };

  const handleBookReturn = async (e, borrowingId) => {
    e.preventDefault();
    const result = await patchBorrowingAsReturned(borrowingId, selectedUser._id);
    const modifiedSelectedUser = {
      ...selectedUser,
      rentals: selectedUser.rentals.filter((rentalId) => rentalId !== borrowingId),
    };
    modifiedSelectedUser.eligible = modifiedSelectedUser.rentals.length < 3;
    setSelectedUser(modifiedSelectedUser);

    updateArrayWithNewUser(modifiedSelectedUser);
  };
  const handleQueryChange = (e) => {
    e.preventDefault();
    if (!e.target.value) {
      setBooksSearchResult(undefined);
      return;
    }
    setBookSearchQuery(e.target.value);
  };

  useEffect(() => {
    const errorMessages = [];
    const successMessages = [];

    // get borrowing by id -> error
    if (borrowingByIdStatus.error) errorMessages.push(borrowingByIdStatus.error);
    // create borrowing -> error, success
    if (createBorrowingStatus.error) errorMessages.push(createBorrowingStatus.error);
    if (createBorrowingStatus.success) successMessages.push(createBorrowingStatus.success);
    // return borrowing -> success, error
    if (returnedBorrowingStatus.error) errorMessages.push(returnedBorrowingStatus.error);
    if (returnedBorrowingStatus.success) successMessages.push(returnedBorrowingStatus.success);

    // searched books -> error
    if (searchedBookStatus?.error) errorMessages.push(searchedBookStatus.error);

    const errorMsg = errorMessages.join('\n');
    const successMsg = successMessages.join('\n');

    setBorrowingManagerError(errorMsg);
    setBorrowingManagerSuccess(successMsg);
  }, [borrowingByIdStatus, createBorrowingStatus, returnedBorrowingStatus, searchedBookStatus]);

  // Reset data statuses on component load
  useEffect(() => {
    unsetBorrowingByIdStatus();
    unsetCreateBorrowingStatus();
    unsetReturnedBorrowingStatus();
    unsetSearchedBookStatus();
  }, [returnSelected]);

  // Get the borrowed books data when component mounts or user changes
  useEffect(() => {
    const rentalIdArray = selectedUser.rentals;
    (async () => {
      const promises = rentalIdArray.map(getBorrowingById);
      const borrowings = await Promise.all(promises);
      setCurrentBorrowings(borrowings);
    })();
  }, [selectedUser]);

  return {
    booksSearchResult,
    currentBorrowings,
    toggleAction,
    handleBookBorrow,
    handleBookReturn,
    bookSearchQuery,
    handleQueryChange,
    returnSelected,
    borrowingManagerError,
    borrowingManagerSuccess,
  };
};

export default UseBorrowingManager;
