import React, { useEffect, useState } from 'react';
import Table from 'components/organisms/Table/Table';
import Filters from 'components/organisms/Filters/Filters';
import Wrapper from 'components/organisms/BookBrowser/BookBrowser.styles';
import axios from 'api/axios';
import Pagination from 'components/molecules/Pagination/Pagination';
import { useForm } from 'react-hook-form';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'status'];
const LIMIT_PER_PAGE = 10;
const INITIAL_PAGE = 1;

const BookBrowser = () => {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fiction: true,
      nonFiction: true,
      scientific: true,
      children: true,
      poetry: true,
      yearFrom: 1800,
      yearTo: new Date().getFullYear(),
    },
  });
  const getBookData = (page, limit) => {
    axios
      .get(`/books?page=${page}&limit=${limit}`)
      .then((res) => {
        const booksResponse = res.data.data.books;
        const preparedBooks = booksResponse.map((book) => {
          const newBookObj = {
            ...book,
            authors: book.authors.map((author) => author.name).join('\n'),
            status: book.currentStatus,
          };
          delete newBookObj.currentStatus;
          return newBookObj;
        });
        setBooks(preparedBooks);

        const paginationResponse = res.data.data.pagination;
        setPages(paginationResponse);
      })
      .catch((err) => console.log(`Could not fetch the data about books`));
  };

  useEffect(() => {
    getBookData(INITIAL_PAGE, LIMIT_PER_PAGE);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > pages.totalPages || newPage < 1) {
      return;
    }
    getBookData(newPage, LIMIT_PER_PAGE);
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log('Filters submitted');
  };
  const onError = (err) => {
    console.log('Filters submitted with error');
  };

  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  return (
    <Wrapper>
      <Table columnNames={columnNames} columnCodes={columnCodes} data={books} />
      <Filters onSubmit={(e) => submitWithPrevent(e)} register={register}/>
      <Pagination pages={pages} handlePageChange={handlePageChange}></Pagination>
    </Wrapper>
  );
};

export default BookBrowser;
