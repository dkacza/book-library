import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as SearchIcon} from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import SquareTileButton from 'components/atoms/SquareTileButton';
import {ReactComponent as BookBorrowIcon} from 'assets/icons/book-borrow-icon.svg';
import StyledBorrowings from 'components/organisms/Borrowings/Borrowings.styles';
import styled from 'styled-components';

const Borrowings = ({
  bookSearchQuery,
  handleQueryChange,
  booksSearchResult,
  handleBookBorrow,
  eligible,
  ...props
}) => {
  return (
    <StyledBorrowings className={props.className}>
      <InputWithIcon
        Icon={SearchIcon}
        placeholder={'search for a book'}
        name={'book-search'}
        id={'book-search'}
        type={'text'}
        value={bookSearchQuery}
        onChange={handleQueryChange}
      ></InputWithIcon>
      <p className="tip">Search by title, isbn or author</p>
      {booksSearchResult ? (
        booksSearchResult.length > 0 ? (
          <ul className="book-list">
            <div className="list-headings">
              <p>Title</p>
              <p>Authors</p>
              <p>ISBN</p>
            </div>
            {booksSearchResult.map(book => (
              <li key={book._id}>
                <p>{book.title}</p>
                <p>{book.authors?.map(author => author.name)?.join(', ')}</p>
                <p>{book.isbn}</p>
                <SquareTileButton
                  className={eligible ? 'eligible' : 'not-eligible'}
                  onClick={e => {
                    if (!eligible) return;
                    handleBookBorrow(e, book._id);
                  }}
                  Icon={BookBorrowIcon}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )
      ) : (
        ''
      )}
    </StyledBorrowings>
  );
};

export default styled(Borrowings)``;
