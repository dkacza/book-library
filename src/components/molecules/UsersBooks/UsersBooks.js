import React from 'react';

const UsersBooks = ({currentBorrowings, handleBookReturn}) => {
  return (
    <ul className="users-books">
      {currentBorrowings ? (
        currentBorrowings.map((borrowing) => (
          <ul key={borrowing._id}>
            <p className="title">{borrowing.book.title}</p>
            <p className="start-date">{borrowing.startDate}</p>
            <p className="expiration-date">{borrowing.expirationDate}</p>
            <button className="return-button" onClick={handleBookReturn}>
              Return
            </button>
          </ul>
        ))
      ) : (
        <p className="no-books-info">User has no currently borrowed books</p>
      )}
    </ul>
  );
}

export default UsersBooks;