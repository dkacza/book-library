import React from 'react';
import SquareTileButton from 'components/atoms/SquareTileButton';
import {ReactComponent as ArrowLeftIcon} from 'assets/icons/keyboard_arrow_left_FILL0_wght600_GRAD0_opsz48.svg';

const Returns = ({currentBorrowings, handleBookReturn}) => {
  return (
    <ul className="users-books">
      {currentBorrowings ? (
        currentBorrowings.map((borrowing) => (
          <li key={borrowing._id}>
            <p className="title">{borrowing.book.title}</p>
            <p className="start-date">{borrowing.startDate}</p>
            <p className="expiration-date">{borrowing.expirationDate}</p>
            <SquareTileButton onClick={(e) => handleBookReturn(e, borrowing._id)} Icon={ArrowLeftIcon}/>
          </li>
        ))
      ) : (
        <p className="no-books-info">User has no currently borrowed books</p>
      )}
    </ul>
  );
}

export default Returns;