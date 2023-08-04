import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import Table from 'components/organisms/Table/Table';
import BookFilters from 'components/organisms/BookFilters/BookFilters';
import Pagination from 'components/molecules/Pagination/Pagination';
import React from 'react';
import useBookBrowser from 'hooks/useBookBrowser';
import StyledContentSection from 'views/MainViews/BooksView/BooksView.styles';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'status'];
const columnProportions = [0.3, 0.3, 0.25, 0.15]
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
        <StyledContentSection>
          {books.length !== 0 ? (
            <Table columnNames={columnNames} columnCodes={columnCodes} data={books} columnproportions={columnProportions}/>
          ) : (
            <p>There are no books that match current criteria</p>
          )}

          <BookFilters onSubmit={(e) => submitWithPrevent(e)} register={register} />
          {books.length !== 0 ? <Pagination pages={pages} handlePageChange={handlePageChange}></Pagination> : ''}
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};
export default BooksView;
