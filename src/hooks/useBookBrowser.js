import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import BookContext from 'providers/BookProvider';

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
    queryString += 'currentStatus=available&';
  }

  // Set year filter
  const startDate = new Date();
  startDate.setFullYear(data.yearFrom);
  queryString += 'publicationDate[gte]=' + startDate.getFullYear() + '&';

  const endDate = new Date();
  endDate.setFullYear(data.yearTo);
  queryString += 'publicationDate[lte]=' + endDate.getFullYear() + '&';

  if (data.searchQuery) {
    queryString += `search=${data.searchQuery}&`;
  }
  return queryString;
};

const useBookBrowser = (initialFormValues) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialFormValues });

  const { books, paginationData, errorMsg, setBookQuery, setCurrentPage } = useContext(BookContext);

  const onSubmit = (data) => {
    const newQuery = buildQuery(data);
    setBookQuery(newQuery);
  };

  // TODO - do something meaningfully here
  const onError = (err) => {
    reset();
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = (newPage) => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };

  return {
    paginationData,
    books,
    register,
    handlePageChange,
    submitWithPrevent,
  };
};
export default useBookBrowser;
