import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'api/axios';
import useWidowDimensions from 'hooks/useWindowDimensions';

const buildQuery = (data) => {
  let queryString = '';
  // Set genre filter
  const { genre } = data;
  let genreString = 'genre=';
  let emptyGenre = true;
  for (const [key, value] of Object.entries(genre)) {
    if (!value) continue;
    genreString += key + ',';
    emptyGenre = false;
  }
  if (!emptyGenre) {
    genreString = genreString.substring(0, genreString.length - 1);
    queryString += genreString + '&';
  }

  // Set available only filter
  if (data.availableOnly) {
    queryString += 'availableOnly=true&';
  }

  // Set year filter
  const startDate = new Date();
  startDate.setFullYear(data.yearFrom);
  queryString += 'publicationDate[gte]=' + startDate.getFullYear() + '&';

  const endDate = new Date();
  endDate.setFullYear(data.yearTo);
  queryString += 'publicationDate[lte]=' + endDate.getFullYear();

  // TODO Add search query
  return queryString;
};

const useBookBrowser = (initialFormValues, initialPage) => {
  const {width} = useWidowDimensions();

  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState({});
  const [query, setQuery] = useState(buildQuery(initialFormValues));
  const [limitPerPage, setLimitPerPage] = useState(10);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({ defaultValues: initialFormValues });

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

        const paginationResponse = res.data.data.pagination
        setPages(paginationResponse);
      })
      .catch((err) => console.log(`Could not fetch the data about books`));
  };
  const onSubmit = (data) => {
    const newQuery = buildQuery(data);
    setQuery(newQuery);
  };
  const onError = (err) => {
    reset();
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = (newPage) => {
    if (newPage > pages.totalPages || newPage < 1) {
      return;
    }
    getBookData(newPage, limitPerPage);
  };

  useEffect(() => {
    if (width <= 2000) setLimitPerPage(10);
    if (width > 2000)  setLimitPerPage(15);
    if (width > 2600) setLimitPerPage(20);
  }, [width]);

  useEffect(() => {
    getBookData(initialPage, limitPerPage);
  }, [query, limitPerPage]);

  return {
    pages,
    books,
    register,
    handlePageChange,
    submitWithPrevent
  }
}
export default useBookBrowser;