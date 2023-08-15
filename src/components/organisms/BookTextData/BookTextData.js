import React from 'react';
import styled from 'styled-components';
import SimpleInput from 'components/atoms/SimpleInput';
import TextArea from 'components/atoms/TextArea';
import StyledBookTextData from 'components/organisms/BookTextData/BookTextData.styles';

const BookTextData = ({ updateSelected, register, book, ...props }) => {
  return (
    <StyledBookTextData className={props.className}>
      {updateSelected ? (
        <div className="title">
          <p className="label">Title</p>
          <SimpleInput {...register('title')} />
        </div>
      ) : (
        ''
      )}
      <div className="authors">
        <p className="label">Authors</p>
        {updateSelected ? (
          <SimpleInput {...register('authors')} />
        ) : (
          <p className="data">{book?.authors?.map((author) => author.name)?.join(', ')}</p>
        )}
      </div>
      <div className="publication-year">
        <p className="label">Publication year</p>
        {updateSelected ? (
          <SimpleInput type="number" {...register('publicationDate')} />
        ) : (
          <p className="data">{book.publicationDate}</p>
        )}
      </div>
      <div className="isbn">
        <p className="label">ISBN</p>
        {updateSelected ? <SimpleInput type="number" {...register('isbn')} /> : <p className="data">{book.isbn}</p>}
      </div>
      <div className="description">
        <p className="label">Description</p>
        {updateSelected ? <TextArea {...register('description')} /> : <p className="data">{book.description}</p>}
      </div>
      <div className="availability">
        <p className="label">Availability</p>
        <p className="data">
          {book.currentStatus === 'available' ? 'Book is available' : 'Book currently is not available'}
        </p>
      </div>
    </StyledBookTextData>
  );
};
export default styled(BookTextData)``;
