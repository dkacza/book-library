import React, { useEffect, useState } from 'react';
import axios from 'api/axios';

import UserData from 'components/molecules/UserData/UserData';
import Captions from 'components/molecules/Captions/Captions';
import Returns from 'components/organisms/BorrowingActions/Returns/Returns';
import Borrowings from 'components/organisms/BorrowingActions/Borrowings/Borrowings';
import useDebounce from 'hooks/useDebounce';
import flattenBookAuthors from 'utils/flattenBookAuthors';

const BorrowingActions = ({ selectedUser, setSelectedUser, handleUserDelete }) => {
  const [returnSelected, setReturnSelected] = useState(true);
  const [currentBorrowings, setCurrentBorrowings] = useState([]);
  const [bookSearchQuery, setBookSearchQuery] = useState();
  const [books, setBooks] = useState();

  const fetchBooks = () => {
    axios
      .get(`/books?search=${bookSearchQuery}`)
      .then((res) => {
        const books = flattenBookAuthors(res.data.data.books);
        setBooks(books);
      })
      .catch((err) => console.log(err));
  };

  const API_CALL_DELAY = 600;
  useDebounce(fetchBooks, API_CALL_DELAY, [bookSearchQuery]);

  const fetchBorrowData = async (borrowingIds) => {
    const promises = borrowingIds.map(async (id) => {
      const response = await axios.get(`rentals/${id}`);
      return response.data.data.rental;
    });
    const data = await Promise.all(promises);
    setCurrentBorrowings(data);
  };

  // Fetch the data about borrowed books
  useEffect(() => {
    const borrowingIDs = selectedUser.rentals;
    fetchBorrowData(borrowingIDs);
  }, [selectedUser]);

  const toggleAction = () => {
    const newAction = !returnSelected;
    setReturnSelected(newAction);
  };
  const handleQueryChange = (e) => {
    if (e.target.value === '') {
      setBooks(undefined);
      return;
    }
    setBookSearchQuery(e.target.value);
  };
  const handleBookReturn = (e, borrowingId) => {
    console.log(borrowingId);
    axios
      .patch(`/rentals/${borrowingId}`, { currentStatus: 'returned' })
      .then(() => {})
      .catch((err) => console.log(err));
    setSelectedUser({
      ...selectedUser,
      rentals: selectedUser.rentals.filter((rental) => rental !== borrowingId),
    });
  };

  const handleBookBorrow = (e, bookId) => {
    console.log(selectedUser);
    axios.post('/rentals', { user: selectedUser._id, book: bookId }).then((res) => {
      const rentalId = res.data.data.rental._id;
      const newRentals = [...selectedUser.rentals, rentalId];
      setSelectedUser({
        ...selectedUser,
        rentals: newRentals,
      });
      fetchBooks();
    });
  };

  return (
    <div className="book-borrowing">
      <UserData selectedUser={selectedUser} />
      <button className="select-user" onClick={handleUserDelete}>
        Select another user
      </button>
      <div className="management">
        <Captions toggleAction={toggleAction} returnSelected={returnSelected} />
        <div className="content">
          {returnSelected ? (
            <Returns currentBorrowings={currentBorrowings} handleBookReturn={handleBookReturn} />
          ) : (
            <Borrowings handleQueryChange={handleQueryChange} bookSearchQuery={bookSearchQuery} books={books} handleBookBorrow={handleBookBorrow} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowingActions;
