import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import {MainViewTemplate} from 'views/MainViews/MainViewTemplate';
import BookTextData from 'components/organisms/BookTextData/BookTextData';
import BookImage from 'components/molecules/BookImage/BookImage';
import StyledContentSection from 'views/MainViews/BookDetailsView/BookDetailsView.styles';
import useBookDetails from 'hooks/useBookDetails';
import BookDetailsLinkContainer from 'components/organisms/BookDetailsLinkContainer';
import FloatingErrorMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const BookDetailsView = () => {
  const {
    book,
    handleImageSelection,
    updateSelected,
    auth,
    file,
    setFile,
    register,
    handleSelectUpdate,
    handleDiscard,
    handleSave,
    setUpdateSelected,
    bookDetailsError,
  } = useBookDetails();

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>{book.title}</Title>
        <StyledContentSection>
          <div className="book-data-container">
            <BookImage
              updateSelected={updateSelected}
              book={book}
              handleImageSelection={handleImageSelection}
              file={file}
              setFile={setFile}
            />
            <BookTextData
              updateSelected={updateSelected}
              register={register}
              book={book}
              errors={bookDetailsError?.formError}
            />
          </div>
          <BookDetailsLinkContainer
            auth={auth}
            updateSelected={updateSelected}
            setUpdateSelected={setUpdateSelected}
            handleSelectUpdate={handleSelectUpdate}
            handleSave={handleSave}
            handleDiscard={handleDiscard}
          />
        </StyledContentSection>
        {bookDetailsError?.dataProviderError ? (
          <FloatingErrorMessage error={bookDetailsError.dataProviderError} />
        ) : (
          ''
        )}
      </main>
    </MainViewTemplate>
  );
};
export default BookDetailsView;
