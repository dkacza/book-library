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
        <section>
          <div className="book-data">
            <div className="img-container">
              <img
                crossOrigin="anonymous"
                src={book ? `http://localhost:8000/img/book-covers/${book.bookCoverPhoto}` : ''}
                alt="book cover"
              />
              {updateSelected ? <input type="file" onChange={(e) => handleImageSelection(e)} /> : ''}
            </div>
            <div className="text-data">
              {updateSelected ? (
                <div className="title-data">
                  <p className="label">Title</p>
                  <input type="text" {...register('title')} />
                </div>
              ) : (
                ''
              )}
              <div className="author-data">
                <p className="label">Author</p>
                {updateSelected ? (
                  <input type="text" {...register('authors')} />
                ) : (
                  <p className="data">{book.authors}</p>
                )}
              </div>
              <div className="publication-year-data">
                <p className="label">Publication year</p>
                {updateSelected ? (
                  <input type="number" {...register('publicationDate')} />
                ) : (
                  <p className="data">{book.publicationDate}</p>
                )}
              </div>
              <div className="isbn-data">
                <p className="label">ISBN</p>
                {updateSelected ? <input type="text" {...register('isbn')} /> : <p className="data">{book.isbn}</p>}
              </div>
              <div className="description-data">
                <p className="label">Description</p>
                {updateSelected ? (
                  <textarea {...register('description')} />
                ) : (
                  <p className="data">{book.description}</p>
                )}
              </div>
              <div className="availability-data">
                <p className="label">Availability</p>
                <p className="data">
                  {book.currentStatus === 'available' ? 'Book is available' : 'Book currently is not available'}
                </p>
              </div>
            </div>
          </div>
          <div className="links-container">
            <StyledLink to={'/books'}>Back to the catalogue</StyledLink>
            {auth.role === 'admin' || 'librarian' ? (
              !updateSelected ? (
                <BorderlessButton onClick={(e) => handleSelectUpdate(e)}>Update book details</BorderlessButton>
              ) : (
                <>
                  <BorderlessButton onClick={(e) => handleSave(e)}>Save</BorderlessButton>
                  <BorderlessButton onClick={() => setUpdateSelected(false)}>Discard</BorderlessButton>
                </>
              )
            ) : (
              ''
            )}
          </div>
        </section>
      </main>
    </MainViewTemplate>
  );
};
export default BookDetailsView;
