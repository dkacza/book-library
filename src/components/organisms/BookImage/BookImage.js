import React from 'react';
import styled from 'styled-components';
import StyledBookImage from 'components/organisms/BookImage/BookImage.styles';

const BookImage = ({ book, updateSelected, handleImageSelection, file, ...props }) => {
  return (
    <StyledBookImage className={props.className}>
      <img
        crossOrigin="anonymous"
        src={book.bookCoverPhoto ? `http://localhost:8000/img/book-covers/${book.bookCoverPhoto}` : '/defaultCover.jpeg'}
        alt="book cover"
      />
      {updateSelected ? (
        <div className="file-input">
          <input type="file" onChange={(e) => handleImageSelection(e)} />
          <p className="label">{file ? file.name : 'Select file'}</p>
        </div>
      ) : (
        ''
      )}
    </StyledBookImage>
  );
};
export default styled(BookImage)``;
