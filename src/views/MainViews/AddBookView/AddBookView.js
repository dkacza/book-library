import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'api/axios';
import AddBookForm from 'components/organisms/AddBookForm/AddBookForm';

const AddBookView = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const [file, setFile] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const postBook = (data) => {
    // process authors
    const newAuthors = data.authors.split(',').map((author) => ({ name: author }));
    console.log(newAuthors);
    const requestBody = {
      ...data,
      authors: newAuthors,
    };
    if (file) requestBody.bookCoverPhoto = file;

    console.log(requestBody);
    axios
      .post(`books`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setSuccessMsg('Book has been created');
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message || 'Something went wrong');
      });
  };

  const onSubmit = (data) => {
    postBook(data);
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
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    setSuccessMsg('');
    setErrorMsg('');
  }, []);

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Add book</Title>
        <AddBookForm
          submitWithPrevent={submitWithPrevent}
          register={register}
          errors={errors}
          file={file}
          handleImageSelection={handleImageSelection}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      </main>
    </MainViewTemplate>
  );
};
export default AddBookView;
