import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import SimpleInput from 'components/atoms/SimpleInput';
import TextArea from 'components/atoms/TextArea';
import SubmitButton from 'components/atoms/SubmitButton';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'api/axios';



const AddBookView = () => {
  const { register, errors, handleSubmit, getValues } = useForm();
  const [file, setFile] = useState();

  const postBook = (data) => {
    // process authors
    const newAuthors = data.authors.split(',').map(author => ({name: author}));
    console.log(newAuthors)
    const requestBody = {
      ...data,
      authors: newAuthors
    }
    if (file) requestBody.bookCoverPhoto = file;

    console.log(requestBody);
    axios.post(`books`, requestBody, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  const onSubmit = (data) => {
    postBook(data);
  }
  const onError = (err) => {
    console.log(err);
  }
  const submitWithPrevent = (e) => {
    console.log('submission')
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  }
  const handleImageSelection = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Add book</Title>
        <form onSubmit={(e) => submitWithPrevent(e)}>
          <div className="title">
            <p className="label">Title</p>
            <SimpleInput {...register('title')} />
          </div>
          <div className="authors">
            <p className="label">Authors</p>
            <p className="additional-info">Separate different authors with "," sign</p>
            <SimpleInput {...register('authors')}/>
          </div>
          <div className="publication-date">
            <p className="label">Publication year</p>
            <SimpleInput type="date" {...register('publicationDate')}/>
          </div>
          <div className="isbn">
            <p className="label">ISBN</p>
            <SimpleInput type="number" {...register('isbn')} />
          </div>
          <div className='genre'>
            <p className='label'>Genre</p>
            <select name='genre' id='genre' {...register('genre')}>
              <option value='fiction'>Fiction</option>
              <option value='nonFiction'>Non-fiction</option>
              <option value='poetry'>Poetry</option>
              <option value='scientific'>Scientific</option>
              <option value='children'>Children literature</option>
            </select>
          </div>
          <div className="description" >
            <p className="label">Description</p>
            <TextArea {...register('description')}/>
          </div>
          <div className="photo-input">
            <p className="label">Cover image</p>
            <input type="file" onChange={(e) => handleImageSelection(e)}/>
            <p className="selected-info">{file ? file.name : 'Default cover photo will be applied'}</p>
          </div>
          <SubmitButton>Add book</SubmitButton>
        </form>
      </main>
    </MainViewTemplate>
  );
};
export default AddBookView;
