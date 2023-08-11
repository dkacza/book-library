import React, { useContext, useEffect, useState } from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import { useParams } from 'react-router-dom';
import axios from 'api/axios';
import { StyledLink } from 'components/atoms/StyledLink';
import authProvider from 'providers/AuthProvider';
import BorderlessButton from 'components/atoms/BorderlessButton';
import { useForm } from 'react-hook-form';
import BookTextData from 'components/organisms/BookTextData/BookTextData';
import BookImage from 'components/organisms/BookImage/BookImage';
import StyledContentSection from 'views/MainViews/BookDetailsView/BookDetailsView.styles';

const BookDetailsView = () => {
  const [book, setBook] = useState({});
  const fetchBookDetails = (id) => {
    axios
      .get(`books/${id}`)
      .then((res) => {
        const newBook = {
          ...res.data.data.book,
          authors: res.data.data.book.authors.map((author) => author.name).join(', '),
          publicationDate: res.data.data.book.publicationDate.substring(0, 4),
        };
        setBook(newBook);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { id } = useParams();
  const { auth } = useContext(authProvider);
  const [updateSelected, setUpdateSelected] = useState(false);
  const { register, errors, handleSubmit, getValues, setValue, reset } = useForm();
  const [file, setFile] = useState();

  const onSubmit = (data) => {
    const requestBody = {};
    for (const [key, val] of Object.entries(data)) {
      if (data[key] === book[key]) continue;
      requestBody[key] = val;
    }
    if (file) requestBody.bookCoverPhoto = file;
    axios
      .patch(`books/${id}`, requestBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const newBook = {
          ...res.data.data.book,
          authors: res.data.data.book.authors.map((author) => author.name).join(', '),
          publicationDate: res.data.data.book.publicationDate.substring(0, 4),
        };
        setBook(newBook);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onError = (err) => {
    console.log(err);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const formValues = getValues();
    console.log(formValues);
    handleSubmit(onSubmit, onError)(formValues);
    reset();
    setUpdateSelected(false);
  };

  useEffect(() => {
    fetchBookDetails(id);
  }, [id]);

  useEffect(() => {
    if (book) {
      setValue('title', book.title);
      setValue('authors', book.authors);
      setValue('publicationDate', book.publicationDate);
      setValue('isbn', book.isbn);
      setValue('description', book.description);
    }
  }, [book]);

  const handleSelectUpdate = (e) => {
    e.preventDefault();
    setValue('title', book.title);
    setValue('authors', book.authors);
    setValue('publicationDate', book.publicationDate);
    setValue('isbn', book.isbn);
    setValue('description', book.description);
    setUpdateSelected(true);
  };
  const handleImageSelection = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>{book.title}</Title>
        <StyledContentSection>
          <div className="book-data">
            <BookImage
              updateSelected={updateSelected}
              book={book}
              handleImageSelection={handleImageSelection}
              file={file}
            />
            <BookTextData updateSelected={updateSelected} register={register} book={book} />
          </div>
          <div className="links-container">
            <StyledLink to={'/books'}>Back to the catalogue</StyledLink>
            {auth.role === 'admin' || 'librarian' ? (
              !updateSelected ? (
                <BorderlessButton onClick={(e) => handleSelectUpdate(e)}>Update book details</BorderlessButton>
              ) : (
                <>
                  <BorderlessButton onClick={(e) => handleSave(e)}>Save</BorderlessButton>
                  <BorderlessButton className="discard" onClick={() => setUpdateSelected(false)}>
                    Discard
                  </BorderlessButton>
                </>
              )
            ) : (
              ''
            )}
          </div>
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};
export default BookDetailsView;
