import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';

const BooksToBorrow = ({bookSearchQuery, handleQueryChange}) => {
  return (
    <div className="books-to-borrow">
      <InputWithIcon
        Icon={SearchIcon}
        placeholder={'search for a book'}
        name={'book-search'}
        id={'book-search'}
        type={'text'}
        value={bookSearchQuery}
        onChange={handleQueryChange}
      ></InputWithIcon>
    </div>
  );
}

export default BooksToBorrow;