import React, { useEffect, useState } from 'react';
import axios from 'api/axios';

import UserData from 'components/molecules/UserData/UserData';
import Captions from 'components/molecules/Captions/Captions';
import UsersBooks from 'components/molecules/UsersBooks/UsersBooks';
import BooksToBorrow from 'components/molecules/BooksToBorrow/BooksToBorrow';

const BookBorrowing = ({ selectedUser, handleUserDelete }) => {
  const [returnSelected, setReturnSelected] = useState(true);
  const [currentBorrowings, setCurrentBorrowings] = useState([]);
  const [bookSearchQuery, setBookSearchQuery] = useState();

  const fetchBorrowData = async (borrowingIds) => {
    const promises = borrowingIds.map(async (id) => {
      const response = await axios.get(`rentals/${id}`);
      return response.data.data.rental;
    });
    const data = await Promise.all(promises);
    console.log(data);
    setCurrentBorrowings(data);
  };

  // Fetch the data about borrowed books
  useEffect(() => {
    const borrowingIDs = selectedUser.rentals;
    fetchBorrowData(borrowingIDs);
  }, []);

  const toggleAction = () => {
    const newAction = !returnSelected;
    setReturnSelected(newAction);
  };
  const handleQueryChange = (e) => {
    setBookSearchQuery(e.target.value);
  };
  const handleBookReturn = () => {
    console.log('Book returned');
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
            <UsersBooks currentBorrowings={currentBorrowings} handleBookReturn={handleBookReturn} />
          ) : (
            <BooksToBorrow handleQueryChange={handleQueryChange} bookSearchQuery={bookSearchQuery} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookBorrowing;
