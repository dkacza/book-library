import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import SquareTileButton from 'components/atoms/SquareTileButton';
import {ReactComponent as ArrowRightIcon} from 'assets/icons/keyboard_arrow_right_FILL0_wght600_GRAD0_opsz48.svg';

const Borrowings = ({ bookSearchQuery, handleQueryChange, books, handleBookBorrow }) => {
  console.log(books);
  return (
    <div className="borrowing-books-selection">
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
            <p>{book.currentStatus}</p>
            <SquareTileButton onClick={(e) => handleBookBorrow(e, book._id)} Icon={ArrowRightIcon}/>
          </li>
        ))}
      </ul> : <p>no books found</p> : ''}
    </div>
  );
};

export default Borrowings;
