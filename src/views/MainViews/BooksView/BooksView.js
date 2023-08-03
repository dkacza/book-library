import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import Table from 'components/organisms/Table/Table';
import Filters from 'components/organisms/Filters/Filters';
import Pagination from 'components/molecules/Pagination/Pagination';
import StyledSection from 'components/templates/BookBrowser/BookBrowser.styles';
import React from 'react';
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

const BooksView = () => {
  const { books, pages, register, handlePageChange, submitWithPrevent } = useBookBrowser(INITIAL_FORM_VALUES, INITIAL_PAGE);

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Book catalogue</Title>
        <StyledSection>
          {books.length !== 0 ? (
            <Table columnNames={columnNames} columnCodes={columnCodes} data={books} />
          ) : (
            <p>There are no books that match current criteria</p>
          )}

          <Filters onSubmit={(e) => submitWithPrevent(e)} register={register} />
          {books.length !== 0 ? <Pagination pages={pages} handlePageChange={handlePageChange}></Pagination> : ''}
        </StyledSection>
      </main>
    </MainViewTemplate>
  );
};
export default BooksView;
