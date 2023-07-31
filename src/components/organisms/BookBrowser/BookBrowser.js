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
  const [query, setQuery] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      genre: {
        fiction: true,
        nonFiction: true,
        scientific: true,
        children: true,
        poetry: true,
      },
      yearFrom: 1800,
      yearTo: new Date().getFullYear(),
    },
  });
  const getBookData = (page, limit) => {
    axios
      .get(`/books?page=${page}&limit=${limit}&${query}`)
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
    setQuery(buildQuery(data));
    getBookData(INITIAL_PAGE, LIMIT_PER_PAGE);
  };
  const onError = (err) => {
    reset();
  };

  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  const buildQuery = (data) => {
    let queryString = '';
    // SET GENRES FILTER
    console.log(data);
    const { genre } = data;
    let genreString = 'genre=[';
    let emptyGenre = true;
    for (const [key, value] of Object.entries(genre)) {
      if (!value) continue;
      genreString += key + ',';
      emptyGenre = false;
    }
    if (!emptyGenre) {
      genreString = genreString.substring(0, genreString.length - 1);
      genreString += ']';
      queryString += genreString + '&';
    }

    // SET AVAILABLE FILTER
    if (data.availableOnly) {
      queryString += 'availableOnly=true&';
    }

    // ADD SEARCH QUERY
    // TODO
    // if (data.searchQuery) {
    //   queryString += 'queryString=' + URLEncoder(data.searchQuery) + '&';
    // }
    // SET YEAR FILTER
    const startDate = new Date();
    startDate.setFullYear(data.yearFrom);
    queryString += 'publicationDate[gte]=' + startDate.getFullYear() + '&';

    const endDate = new Date();
    endDate.setFullYear(data.yearTo);
    queryString += 'publicationDate[lte]=' + endDate.getFullYear();

    return queryString;
  };
  return (
    <Wrapper>
      {books.length !== 0 ? <Table columnNames={columnNames} columnCodes={columnCodes} data={books} /> : <p>There are no books that match current criteria</p>}

      <Filters onSubmit={(e) => submitWithPrevent(e)} register={register} />
      {books.length !== 0 ? <Pagination pages={pages} handlePageChange={handlePageChange}></Pagination> : ''}

    </Wrapper>
  );
};

export default BookBrowser;
