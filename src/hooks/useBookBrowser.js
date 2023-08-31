import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import BookContext from 'providers/BookProvider';
import processFormState from 'utils/processFormState';
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

const useBookBrowser = () => {
  const {
    books,
    allBooksStatus,
    paginationData,
    setBookQuery,
    setCurrentPage,
    bookFormState,
    setBookFormState,
  } = useContext(BookContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({defaultValues: bookFormState});
  const [bookBrowserError, setBookBrowserError] = useState({});

  const onSubmit = data => {
    const newQuery = buildQuery(data);
    setBookQuery(newQuery);
    setBookBrowserError({
      ...bookBrowserError,
      formError: '',
    });
    setBookFormState(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, allBooksStatus.error]);

  // When component mounts set the values corresponding to those stored in provider
  useEffect(() => {
    const fieldList = processFormState(bookFormState);
    fieldList.forEach(field => {
      setValue(...field);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookFormState]);

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
