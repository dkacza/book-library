import React from 'react';
import styled from 'styled-components';
import UnderlinedInput from 'components/atoms/UnderlinedInput';
import TextArea from 'components/atoms/TextArea';
import StyledBookTextData from 'components/organisms/BookTextData/BookTextData.styles';

const BookTextData = ({ updateSelected, register, book, ...props }) => {
  const currentStatus = book.currentStatus;
  return (
    <StyledBookTextData className={props.className}>
      {updateSelected ? (
        <div className="title">
          <p className="label">Title</p>
          <UnderlinedInput {...register('title')} />
        </div>
      ) : (
        ''
      )}
      <div className="authors">
        <p className="label">Authors</p>
        {updateSelected ? (
          <UnderlinedInput {...register('authors')} />
        ) : (
          <p className="data">{book?.authors?.map((author) => author.name)?.join(', ')}</p>
        )}
      </div>
      <div className="publication-year">
        <p className="label">Publication year</p>
        {updateSelected ? (
          <UnderlinedInput type="number" {...register('publicationDate')} />
        ) : (
          <p className="data">{book.publicationDate}</p>
        )}
      </div>
      <div className="isbn">
        <p className="label">ISBN</p>
        {updateSelected ? <UnderlinedInput type="number" {...register('isbn')} /> : <p className="data">{book.isbn}</p>}
      </div>
      <div className="description">
        <p className="label">Description</p>
        {updateSelected ? <TextArea {...register('description')} /> : <p className="data">{book.description}</p>}
      </div>
      {updateSelected ? (
        ''
      ) : (
        <div className="availability">
          <p className="label">Availability</p>
          <p className={`data ${currentStatus}`}>
            {currentStatus === 'available' ? 'Book is available' : 'Book currently is not available'}
          </p>
        </div>
      )}
    </StyledBookTextData>
  );
};
export default styled(BookTextData)``;
