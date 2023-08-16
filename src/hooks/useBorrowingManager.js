import { useContext, useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import BookContext from 'providers/BookProvider';
import BorrowingsContext from 'providers/BorrowingsProvider';

const API_CALL_DELAY = 600;

const UseBorrowingManager = (selectedUser, setSelectedUser) => {
  const [currentBorrowings, setCurrentBorrowings] = useState([]);
  const [returnSelected, setReturnSelected] = useState(true);
  const [booksSearchResult, setBooksSearchResult] = useState([]);
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  const { searchForBook } = useContext(BookContext);
  const { getBorrowingById, patchBorrowingAsReturned, postBorrowing } = useContext(BorrowingsContext);
  const getBooksFromProvider = async () => {
    const searchResult = await searchForBook(bookSearchQuery);
    setBooksSearchResult(searchResult);
  };

  useDebounce(getBooksFromProvider, API_CALL_DELAY, [bookSearchQuery]);

  const toggleAction = () => {
    const newAction = !returnSelected;
    setReturnSelected(newAction);
  };
  const handleBookBorrow = async (e, bookId) => {
    const newBorrowing = await postBorrowing(bookId, selectedUser._id);
    const modifiedSelectedUser = {
      ...selectedUser,
      rentals: [...selectedUser.rentals, newBorrowing._id],
    };
    console.log(modifiedSelectedUser);
    setSelectedUser(modifiedSelectedUser);

    getBooksFromProvider();

  };

  const handleBookReturn = async (e, borrowingId) => {
    e.preventDefault();
    const result = await patchBorrowingAsReturned(borrowingId, selectedUser._id);
    console.log(result);
    const modifiedSelectedUser = {
      ...selectedUser,
      rentals: selectedUser.rentals.filter((rentalId) => rentalId !== borrowingId),
    };
    setSelectedUser(modifiedSelectedUser);
  };

  useEffect(() => {
    console.log(selectedUser);
    const rentalIdArray = selectedUser.rentals;
    (async () => {
      const promises = rentalIdArray.map(getBorrowingById);
      const borrowings = await Promise.all(promises);
      setCurrentBorrowings(borrowings);
    })();
  }, [selectedUser]);

  const handleQueryChange = (e) => {
    e.preventDefault();
    if (e.target.value?.length < 3) {
      setBooksSearchResult([]);
      return;
    }
    setBookSearchQuery(e.target.value);
  };

  return {
    booksSearchResult,
    currentBorrowings,
    toggleAction,
    handleBookBorrow,
    handleBookReturn,
    bookSearchQuery,
    handleQueryChange,
    returnSelected,
  };
};

export default UseBorrowingManager;
