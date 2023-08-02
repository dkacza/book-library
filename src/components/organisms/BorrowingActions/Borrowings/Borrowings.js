import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import SquareTileButton from 'components/atoms/SquareTileButton';
import {ReactComponent as BookBorrowIcon} from 'assets/icons/book-borrow-icon.svg';
import StyledBorrowings from 'components/organisms/BorrowingActions/Borrowings/Borrowings.styles';

const Borrowings = ({ bookSearchQuery, handleQueryChange, books, handleBookBorrow }) => {
  return (
    <StyledBorrowings className="borrowing">
      <InputWithIcon
        Icon={SearchIcon}
        placeholder={'search for a book'}
        name={'book-search'}
        id={'book-search'}
        type={'text'}
        value={bookSearchQuery}
        onChange={handleQueryChange}
      ></InputWithIcon>
      {books ? books.length > 0 ? <ul className="book-list">
        {books.map(book => (
          <li key={book._id}>
            <p>{book.title}</p>
            <p>{book.authors}</p>
            <p>{book.isbn}</p>
            <SquareTileButton onClick={(e) => handleBookBorrow(e, book._id)} Icon={BookBorrowIcon}/>
          </li>
        ))}
      </ul> : <p>No books found</p> : <p>Search for a book by title or ISBN</p>}
    </StyledBorrowings>
  );
};

export default Borrowings;
