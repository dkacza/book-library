import React, { useEffect, useReducer, useState } from 'react';
import Table from 'components/organisms/Table/Table';
import Filters from 'components/organisms/Filters/Filters';
import Wrapper from 'components/organisms/BookBrowser/BookBrowser.styles';
import axios from 'api/axios';
import Pagination from 'components/molecules/Pagination/Pagination';

const columnNames = ['Title', 'Authors', 'ISBN', 'Status'];
const columnCodes = ['title', 'authors', 'isbn', 'status'];
const LIMIT_PER_PAGE = 10;
const INITIAL_PAGE = 1;
const INITIAL_FILTER_STATE = {
  searchQuery: '',
  releaseYear: {
    from: null,
    to: null,
  },
  genre: {
    fiction: true,
    nonFiction: true,
    scientific: true,
    children: true,
    poetry: true,
  },
  availableOnly: false,
};
const ACTION_TYPES = {
  toggleFiction: 'TOGGLE_FICTION',
  toggleNonFiction: 'TOGGLE_NON_FICTION',
  toggleScientific: 'TOGGLE_SCIENTIFIC',
  toggleChildren: 'TOGGLE_CHILDREN',
  togglePoetry: 'TOGGLE_POETRY',
  toggleAvailability: 'TOGGLE_AVAILABILITY',
  changeFromDate: 'CHANGE_FROM_DATE',
  changeToDate: 'CHANGE_TO_DATE',
  changeSearchQuery: 'CHANGE_SEARCH_QUERY'
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.toggleFiction:
      return {
        ...state,
        genre: {
          ...state.genre,
          fiction: !state.genre.fiction,
        },
      };
    case ACTION_TYPES.toggleNonFiction:
      return {
        ...state,
        genre: {
          ...state.genre,
          nonFiction: !state.genre.nonFiction,
        },
      };
    case ACTION_TYPES.toggleScientific:
      return {
        ...state,
        genre: {
          ...state.genre,
          scientific: !state.genre.scientific,
        },
      };
    case ACTION_TYPES.toggleChildren:
      return {
        ...state,
        genre: {
          ...state.genre,
          children: !state.genre.children,
        },
      };
    case ACTION_TYPES.togglePoetry:
      return {
        ...state,
        genre: {
          ...state.genre,
          poetry: !state.genre.poetry,
        },
      };
    case ACTION_TYPES.toggleAvailability:
      return {
        ...state,
        availableOnly: !state.availableOnly,
      };
    case ACTION_TYPES.changeFromDate:
      return {
        ...state,
        releaseYear: {
          ...state.releaseYear,
          from: action.newValue,
        },
      };
    case ACTION_TYPES.changeToDate:
      return {
        ...state,
        releaseYear: {
          ...state.releaseYear,
          to: action.newValue,
        },
      };
    case ACTION_TYPES.changeSearchQuery:
      return {
        ...state,
        searchQuery: action.newValue
      };
    default:
      return state;
  }
};

const BookBrowser = () => {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState({});
  const [filters, dispatch] = useReducer(reducer, INITIAL_FILTER_STATE);
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
  const onSubmitFilters = (e) => {
    e.preventDefault();
    console.log(filters);
  }

  return (
    <Wrapper>
      <Table columnNames={columnNames} columnCodes={columnCodes} data={books} />
      <Filters filters={filters} dispatch={dispatch} ACTION_TYPES={ACTION_TYPES} onSubmit={onSubmitFilters}/>
      <Pagination pages={pages} handlePageChange={handlePageChange}></Pagination>
    </Wrapper>
  );
};

export default BookBrowser;
