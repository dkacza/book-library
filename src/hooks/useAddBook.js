import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import axios from 'api/axios';
import BookContext from 'providers/BookProvider';

const buildRequestBody = (data, file) => {
  // process authors
  const newAuthors = data.authors.split(',').map((author) => ({ name: author }));
  const requestBody = {
    ...data,
    authors: newAuthors,
  };
  if (file) requestBody.bookCoverPhoto = file;

  return requestBody;
}

const useAddBook = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const {postBook, postBookErrorMsg, postBookConfirmationMsg} = useContext(BookContext);


  const onSubmit = (data) => {
    const requestBody = buildRequestBody(data);
    postBook(requestBody);
  };
  const onError = (err) => {
    setErrorMsg('Validation rules violated');
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    handleSubmit(onSubmit, onError)();
  };
  const handleImageSelection = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setSuccessMsg('');
    setErrorMsg('');
  }, []);

  return { submitWithPrevent, register, errors, file, handleImageSelection, errorMsg, successMsg };
};
export default useAddBook;
