import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import Table from 'components/organisms/Table/Table';
import BookFilters from 'components/organisms/BookFilters/BookFilters';
import Pagination from 'components/molecules/Pagination/Pagination';
import React from 'react';
import useBookBrowser from 'hooks/useBookBrowser';
import FloatingErrorMessage from 'components/molecules/FloatingErrorMessage/FloatingErrorMessage';
import TableViewTemplate from 'views/MainViews/TableViewTemplate';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'currentStatus'];
const columnProportions = [0.3, 0.3, 0.25, 0.15];
const INITIAL_FORM_VALUES = {
  genre: {
    fiction: true,
    nonFiction: true,
    scientific: true,
    children: true,
    poetry: true,
  },
};

const BooksView = () => {
  const { paginationData, books, register, handlePageChange, submitWithPrevent, bookBrowserError } =
    useBookBrowser(INITIAL_FORM_VALUES);
  const processedBooks = books.map((book) => ({
    ...book,
    authors: book.authors.map((author) => author.name).join(', '),
  }));
  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Book catalogue</Title>
        <TableViewTemplate>
          {books.length > 0 ? (
            <Table
              columnNames={columnNames}
              columnCodes={columnCodes}
              data={processedBooks}
              columnproportions={columnProportions}
              routePath={'/book'}
              emptyDataMessage={'There are no books that match current criteria'}
            />
          ) : (
            <p className="empty-data-error-msg">No books found</p>
          )}

          <BookFilters
            errors={bookBrowserError?.formError}
            onSubmit={(e) => submitWithPrevent(e)}
            register={register}
          />
          {books.length !== 0 ? (
            <Pagination paginationData={paginationData} handlePageChange={handlePageChange}></Pagination>
          ) : (
            ''
          )}
        </TableViewTemplate>
        {bookBrowserError?.dataProviderError ? <FloatingErrorMessage error={bookBrowserError.dataProviderError} /> : ''}
      </main>
    </MainViewTemplate>
  );
};
export default BooksView;
