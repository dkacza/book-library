import {useForm} from 'react-hook-form';
import {useContext, useEffect, useState} from 'react';
import BookContext from 'providers/BookProvider';

const buildRequestBody = (data, file) => {
  const newAuthors = data.authors.split(',').map(author => ({name: author}));
  const requestBody = {
    ...data,
    authors: newAuthors,
  };
  if (file) requestBody.bookCoverPhoto = file;

  return requestBody;
};

const useAddBook = () => {
  const {
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm();
  const [file, setFile] = useState();
  const {postBook, postBookStatus} = useContext(BookContext);
  const [addBookError, setAddBookError] = useState();
  const [addBookSuccess, setAddBookSuccess] = useState();

  const onSubmit = data => {
    const requestBody = buildRequestBody(data, file);
    postBook(requestBody);
  };
  const onError = err => {
    setAddBookError({
      ...addBookError,
      formError: err,
    });
  };
  const submitWithPrevent = e => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handleImageSelection = e => {
    setFile(e.target.files[0]);
  };

  // When status from context changes, set according error or success messages on this view
  useEffect(() => {
    setAddBookError({
      formError: errors,
      dataProviderError: postBookStatus?.error,
    });
    if (postBookStatus?.success) {
      setAddBookSuccess({
        message: postBookStatus.success,
      });
      reset();
    }
  }, [postBookStatus, errors, reset]);

  // Clear success and error messages on page load
  useEffect(() => {
    setAddBookError({});
    setAddBookSuccess({});
  }, []);

  return {
    submitWithPrevent,
    register,
    errors,
    file,
    setFile,
    handleImageSelection,
    addBookError,
    addBookSuccess,
  };
};
export default useAddBook;
