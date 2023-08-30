import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import authProvider from 'providers/AuthProvider';
import {useForm} from 'react-hook-form';
import BookContext from 'providers/BookProvider';

const buildRequestBody = (data, book, file) => {
  const requestBody = {};
  for (const [key, val] of Object.entries(data)) {
    if (data[key] === book[key]) continue;

    if (key === 'authors') {
      requestBody[key] = val.split(',').map(author => ({name: author}));
      continue;
    }
    requestBody[key] = val;
  }
  if (file) requestBody.bookCoverPhoto = file;
  return requestBody;
};

const useBookDetails = () => {
  const {auth} = useContext(authProvider);
  const {id} = useParams();

  const {
    books,
    getBookById,
    patchBookDetails,
    bookByIdStatus,
    updateBookStatus,
    unsetUpdateBookStatus,
  } = useContext(BookContext);
  const {
    register,
    formState: {errors},
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm();
  const [updateSelected, setUpdateSelected] = useState(false);
  const [book, setBook] = useState({});
  const [file, setFile] = useState();
  const [bookDetailsError, setBookDetailsError] = useState();

  const onSubmit = async data => {
    const requestBody = buildRequestBody(data, book, file);
    patchBookDetails(id, requestBody);
  };
  const onError = err => {
    setBookDetailsError({
      ...bookDetailsError,
      formError: err,
    });
  };
  const handleSave = e => {
    e.preventDefault();
    const formValues = getValues();
    handleSubmit(onSubmit, onError)(formValues);
  };
  const handleSelectUpdate = e => {
    e.preventDefault();
    reset();
    if (book) setFormValues();
    setUpdateSelected(true);
  };
  const handleDiscard = e => {
    unsetUpdateBookStatus();
    e.preventDefault();
    reset();
    setUpdateSelected(false);
  };
  const handleImageSelection = e => {
    setFile(e.target.files[0]);
  };
  const setFormValues = () => {
    setValue('title', book.title);
    setValue('authors', book.authors?.map(author => author.name)?.join(', '));
    setValue('publicationDate', book.publicationDate?.split('-')[0]);
    setValue('isbn', book.isbn);
    setValue('description', book.description);
  };
  const getBookDetails = () => {
    (async () => {
      const bookDetails = await getBookById(id);
      setBook(bookDetails);
    })();
  };

  // Get book details on component load
  useEffect(
    getBookDetails,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, books],
  );

  // Set placeholder values
  useEffect(() => {
    if (book) setFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  // When errors appear or disappear set new external error message
  useEffect(() => {
    const newDataProviderError =
      bookByIdStatus.error || updateBookStatus.error
        ? bookByIdStatus.error + '\n' + updateBookStatus.error
        : '';
    setBookDetailsError({
      ...bookDetailsError,
      formError: '',
      dataProviderError: newDataProviderError,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, bookByIdStatus.error, updateBookStatus.error]);

  // When book status is updated, clear form errors
  useEffect(() => {
    setBookDetailsError({
      dataProviderError: updateBookStatus.error,
      formError: '',
    });
    if (!updateBookStatus.error) setUpdateSelected(false);
  }, [updateBookStatus]);

  return {
    book,
    handleImageSelection,
    updateSelected,
    auth,
    file,
    setFile,
    register,
    handleSelectUpdate,
    handleDiscard,
    handleSave,
    setUpdateSelected,
    bookDetailsError,
  };
};
export default useBookDetails;
