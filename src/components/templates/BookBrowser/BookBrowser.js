import React from 'react';
import Table from 'components/organisms/Table/Table';
import Filters from 'components/organisms/Filters/Filters';
import Wrapper from 'components/templates/BookBrowser/BookBrowser.styles';
import Pagination from 'components/molecules/Pagination/Pagination';
import useBookBrowser from 'hooks/useBookBrowser';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'status'];
const INITIAL_PAGE = 1;
const INITIAL_FORM_VALUES = {
  genre: {
    fiction: true,
    nonFiction: true,
    scientific: true,
    children: true,
    poetry: true,
  },
  yearFrom: 1800,
  yearTo: new Date().getFullYear(),
};

const BookBrowser = () => {
  const { books, pages, register, handlePageChange, submitWithPrevent } = useBookBrowser(INITIAL_FORM_VALUES, INITIAL_PAGE);

  return (
    <Wrapper>
      {books.length !== 0 ? (
        <Table columnNames={columnNames} columnCodes={columnCodes} data={books} />
      ) : (
        <p>There are no books that match current criteria</p>
      )}

      <Filters onSubmit={(e) => submitWithPrevent(e)} register={register} />
      {books.length !== 0 ? <Pagination pages={pages} handlePageChange={handlePageChange}></Pagination> : ''}
    </Wrapper>
  );
};
export default BookBrowser;
