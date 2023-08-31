import React from 'react';
import styled from 'styled-components';
import StyledBookImage from 'components/molecules/BookImage/BookImage.styles';
import FileInput from 'components/atoms/FileInput';
import {API_URL} from 'api/axios';

const BookImage = ({book, updateSelected, handleImageSelection, setFile, file, ...props}) => {
  return (
    <StyledBookImage className={props.className}>
      <img
        crossOrigin="anonymous"
        src={
          book.bookCoverPhoto
            ? `${API_URL}/img/book-covers/${book.bookCoverPhoto}`
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
