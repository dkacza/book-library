import React from 'react';
import SquareTileButton from 'components/atoms/SquareTileButton';
import {ReactComponent as ReturnIcon} from 'assets/icons/keyboard_return_FILL0_wght600_GRAD0_opsz48.svg';
import StyledReturns from 'components/organisms/Returns/Returns.styles';
import styled from 'styled-components';

const Returns = ({currentBorrowings, handleBookReturn, ...props}) => {
  return (
    <StyledReturns className={props.className}>
      {currentBorrowings.length > 0 ? (
        <ul>
          <div className="list-headings">
            <p>Title</p>
            <p>Date of borrowing</p>
            <p>Date of expiration</p>
          </div>
          {currentBorrowings.map(borrowing => (
            <li key={borrowing._id} className={borrowing.currentStatus}>
              <p className="title">{borrowing.title || borrowing.book.title}</p>
              <p className="start-date">{borrowing.startDate}</p>
              <p className="expiration-date">{borrowing.expirationDate}</p>
              <SquareTileButton
                onClick={e => handleBookReturn(e, borrowing._id)}
                Icon={ReturnIcon}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-books-info">User has no currently borrowed books</p>
      )}
    </StyledReturns>
  );
};

export default styled(Returns)``;
