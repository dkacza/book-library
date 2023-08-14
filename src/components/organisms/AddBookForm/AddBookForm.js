import React from 'react';
import styled from 'styled-components';
import SimpleInput from 'components/atoms/SimpleInput';
import validationRegexes from 'utils/validationRegexes';
import TextArea from 'components/atoms/TextArea';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledAddBookForm from 'components/organisms/AddBookForm/AddBookForm.styles';
import FileInput from 'components/atoms/FileInput';
import BorderlessButton from 'components/atoms/BorderlessButton';

const AddBookForm = ({ submitWithPrevent, register, errors, file, handleImageSelection, errorMsg, successMsg }) => {
  return (
    <StyledAddBookForm onSubmit={(e) => submitWithPrevent(e)}>
      <div className="title">
        <p className="label">Title</p>
        <SimpleInput {...register('title', { required: true })} className={errors.title ? 'error' : ''} />
      </div>

      <div className="authors">
        <p className="label">Authors</p>
        <SimpleInput
          {...register('authors', {
            required: true,
            validate: (val) => validationRegexes.authorsNamesRegex.test(val),
          })}
          className={errors.authors ? 'error' : ''}
        />
        <p className="hint">Separate different authors with "," sign</p>
      </div>

      <div className="publication-date">
        <p className="label">Publication year</p>
        <SimpleInput
          type="date"
          {...register('publicationDate', { required: true })}
          className={errors.publicationDate ? 'error' : ''}
        />
      </div>

      <div className="isbn">
        <p className="label">ISBN</p>
        <SimpleInput type="number" {...register('isbn', { required: true })} className={errors.isbn ? 'error' : ''} />
      </div>

      <div className="genre">
        <p className="label">Genre</p>
        <select
          name="genre"
          id="genre"
          {...register('genre', { required: true })}
          className={errors.genre ? 'error' : ''}
        >
          <option value="fiction">Fiction</option>
          <option value="nonFiction">Non-fiction</option>
          <option value="poetry">Poetry</option>
          <option value="scientific">Scientific</option>
          <option value="children">Children literature</option>
        </select>
      </div>

      <div className="description">
        <p className="label">Description</p>
        <TextArea {...register('description')} />
      </div>

      <div className="photo-input">
        <p className="label">Cover image</p>
        <FileInput handleImageSelection={handleImageSelection} file={file}/>
        <BorderlessButton>clear photo selection</BorderlessButton>
      </div>


      <div className='submission-wrapper'>
        <SubmitButton type="submit">Add book</SubmitButton>
        {errorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
        {successMsg ? <p className="success-msg">{successMsg}</p> : ''}
      </div>

    </StyledAddBookForm>
  );
};
export default styled(AddBookForm)``;
