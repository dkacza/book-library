import React from 'react';
import styled from 'styled-components';
import StyledBookImage from 'components/organisms/BookImage/BookImage.styles';

const BookImage = ({book, updateSelected, handleImageSelection, ...props}) => {
  return (
    <StyledBookImage className={props.className}>
      <img
        crossOrigin="anonymous"
        src={book ? `http://localhost:8000/img/book-covers/${book.bookCoverPhoto}` : ''}
        alt="book cover"
      />
      {updateSelected ? <input type="file" onChange={(e) => handleImageSelection(e)} /> : ''}
    </StyledBookImage>
  )
}
export default styled(BookImage)``;