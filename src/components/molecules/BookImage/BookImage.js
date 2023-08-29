import React from 'react';
import styled from 'styled-components';
import StyledBookImage from 'components/molecules/BookImage/BookImage.styles';
import FileInput from 'components/atoms/FileInput';

const BookImage = ({book, updateSelected, handleImageSelection, setFile, file, ...props}) => {
  return (
    <StyledBookImage className={props.className}>
      <img
        crossOrigin="anonymous"
        src={
          book.bookCoverPhoto
            ? `http://localhost:8000/img/book-covers/${book.bookCoverPhoto}`
            : '/defaultCover.jpeg'
        }
        alt="book cover"
      />
      {updateSelected ? (
        <FileInput handleImageSelection={handleImageSelection} file={file} setFile={setFile} />
      ) : (
        ''
      )}
    </StyledBookImage>
  );
};
export default styled(BookImage)``;
