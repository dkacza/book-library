import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authProvider from 'providers/AuthProvider';
import { useForm } from 'react-hook-form';
import BookContext from 'providers/BookProvider';

const buildRequestBody = (data, book, file) => {
  const requestBody = {};
  for (const [key, val] of Object.entries(data)) {
    if (data[key] === book[key]) continue;

    if (key === 'authors') {
      requestBody[key] = val.split(',').map((author) => ({ name: author }));
      continue;
    }
    requestBody[key] = val;
  }
  if (file) requestBody.bookCoverPhoto = file;
  return requestBody;
};

const useBookDetails = () => {
  const { auth } = useContext(authProvider);
  const { id } = useParams();

  const { books, getBookById, patchBookDetails, bookDetailsErrorMsg, setBookDetailsErrorMsg } = useContext(BookContext);

  const { register, errors, handleSubmit, getValues, setValue, reset } = useForm();
  const [updateSelected, setUpdateSelected] = useState(false);
  const [book, setBook] = useState({});
  const [file, setFile] = useState();

  const onSubmit = async (data) => {
    const requestBody = buildRequestBody(data, book, file);
    patchBookDetails(id, requestBody);
  };
  const onError = (err) => {
    setBookDetailsErrorMsg('Validation error');
  };
  const handleSave = (e) => {
    e.preventDefault();
    const formValues = getValues();
    handleSubmit(onSubmit, onError)(formValues);
    reset();
    setUpdateSelected(false);
  };
  const handleSelectUpdate = (e) => {
    e.preventDefault();
    if (book) setFormValues();
    setUpdateSelected(true);
  };
  const handleImageSelection = (e) => {
    setFile(e.target.files[0]);
  };
  const setFormValues = () => {
    setValue('title', book.title);
    setValue('authors', book.authors?.map((author) => author.name)?.join(', '));
    setValue('publicationDate', book.publicationDate?.split('-')[0]);
    setValue('isbn', book.isbn);
    setValue('description', book.description);
  };
  const getBookDetails = () => {
    const getBookFromProvider = async () => {
      const bookDetails = await getBookById(id);
      setBook(bookDetails);
    };
    getBookFromProvider();
  };

  // Get book details on component load
  useEffect(getBookDetails, [id, books]);

  // Set placeholder values
  useEffect(() => {
    if (book) setFormValues();
  }, [book]);

  return {
    book,
    handleImageSelection,
    updateSelected,
    auth,
    file,
    register,
    handleSelectUpdate,
    handleSave,
    setUpdateSelected,
  };
};
export default useBookDetails;
