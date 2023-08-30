import React from 'react';
import styled from 'styled-components';
import UnderlinedInput from 'components/atoms/UnderlinedInput';
import validationRegexes from 'utils/validationRegexes';
import TextArea from 'components/atoms/TextArea';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledAddBookForm from 'components/organisms/AddBookForm/AddBookForm.styles';
import FileInput from 'components/atoms/FileInput';
import isEmptyObject from 'utils/isEmptyObject';

const AddBookForm = ({
  submitWithPrevent,
  register,
  errors,
  handleImageSelection,
  file,
  setFile,
}) => {
  return (
    <StyledAddBookForm onSubmit={e => submitWithPrevent(e)}>
      <div className="title">
        <p className="label">Title</p>
        <UnderlinedInput
          {...register('title', {required: true})}
          className={errors?.title ? 'error' : ''}
        />
      </div>

      <div className="authors">
        <p className="label">Authors</p>
        <UnderlinedInput
          {...register('authors', {
            required: true,
            validate: val => validationRegexes.authorsNamesRegex.test(val),
          })}
          className={errors?.authors ? 'error' : ''}
        />
        <p className="hint">Separate different authors with "," sign</p>
      </div>

      <div className="publication-date">
        <p className="label">Publication year</p>
        <UnderlinedInput
          type="date"
          {...register('publicationDate', {required: true})}
          className={errors?.publicationDate ? 'error' : ''}
        />
      </div>

      <div className="isbn">
        <p className="label">ISBN</p>
        <UnderlinedInput
          type="number"
          {...register('isbn', {
            required: true,
            validate: val => validationRegexes.isbnRegex.test(val),
          })}
          className={errors?.isbn ? 'error' : ''}
        />
      </div>

      <div className="genre">
        <p className="label">Genre</p>
        <select
          name="genre"
          id="genre"
          {...register('genre', {required: true})}
          className={errors?.genre ? 'error' : ''}
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
        <FileInput handleImageSelection={handleImageSelection} file={file} setFile={setFile} />
      </div>

      <div className="submission-wrapper">
        <SubmitButton type="submit">Add book</SubmitButton>
        {!isEmptyObject(errors) ? (
          <p className="error-msg">Validation rules violated. Please fill the form correctly.</p>
        ) : (
          ''
        )}
      </div>
    </StyledAddBookForm>
  );
};
export default styled(AddBookForm)``;
