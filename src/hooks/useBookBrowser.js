import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import BookContext from 'providers/BookProvider';
const buildQuery = data => {
  let queryString = '';

  const {genre} = data;
  let genreString = 'genre=';
  let emptyGenre = true;
  let fullGenre = true;
  for (const [key, value] of Object.entries(genre)) {
    if (!value) {
      fullGenre = false;
      continue;
    }
    genreString += key + ',';
    emptyGenre = false;
  }
  if (!emptyGenre && !fullGenre) {
    genreString = genreString.substring(0, genreString.length - 1);
    queryString += genreString + '&';
  }

  if (data.availableOnly) {
    queryString += 'currentStatus=available&';
  }

  if (data.yearFrom) queryString += 'publicationDate[gte]=' + data.yearFrom + '&';
  if (data.yearTo) queryString += 'publicationDate[lte]=' + data.yearTo + '&';

  if (data.searchQuery) {
    queryString += `search=${data.searchQuery}&`;
  }

  return queryString.substring(0, queryString.length - 1);
};

const useBookBrowser = initialFormValues => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: initialFormValues});
  const {books, allBooksStatus, paginationData, setBookQuery, setCurrentPage} =
    useContext(BookContext);
  const [bookBrowserError, setBookBrowserError] = useState({});

  const onSubmit = data => {
    const newQuery = buildQuery(data);
    setBookQuery(newQuery);
    setBookBrowserError({
      ...bookBrowserError,
      formError: '',
    });
  };
  const onError = err => {
    setBookBrowserError({
      ...bookBrowserError,
      formError: err,
    });
  };
  const submitWithPrevent = e => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = newPage => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };

  const handleRecordSelect = (e, setRoute) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setRoute(`/book/${id}`);
  };

  useEffect(() => {
    setBookBrowserError({
      ...bookBrowserError,
      formError: errors,
      dataProviderError: allBooksStatus.error,
    });
  }, [errors, allBooksStatus.error]);

  return {
    paginationData,
    books,
    register,
    handlePageChange,
    handleRecordSelect,
    submitWithPrevent,
    bookBrowserError,
  };
};
export default useBookBrowser;
