import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import { StyledLink } from 'components/atoms/StyledLink';
import BorderlessButton from 'components/atoms/BorderlessButton';
import BookTextData from 'components/organisms/BookTextData/BookTextData';
import BookImage from 'components/organisms/BookImage/BookImage';
import StyledContentSection from 'views/MainViews/BookDetailsView/BookDetailsView.styles';
import useBookDetails from 'hooks/useBookDetails';

const BookDetailsView = () => {
  const {book, handleImageSelection, updateSelected, auth, file, register, handleSelectUpdate, handleSave, setUpdateSelected} = useBookDetails();
  console.log(book);

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>{book.title}</Title>
        <StyledContentSection>
          <div className='book-data'>
            <BookImage
              updateSelected={updateSelected}
              book={book}
              handleImageSelection={handleImageSelection}
              file={file}
            />
            <BookTextData updateSelected={updateSelected} register={register} book={book} />
          </div>
          <div className='links-container'>
            <StyledLink to={'/books'}>Back to the catalogue</StyledLink>
            {auth.role === 'admin' || 'librarian' ? (
              !updateSelected ? (
                <BorderlessButton onClick={(e) => handleSelectUpdate(e)}>Update book details</BorderlessButton>
              ) : (
                <>
                  <BorderlessButton onClick={(e) => handleSave(e)}>Save</BorderlessButton>
                  <BorderlessButton className='discard' onClick={() => setUpdateSelected(false)}>
                    Discard
                  </BorderlessButton>
                </>
              )
            ) : (
              ''
            )}
          </div>
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};
export default BookDetailsView;
