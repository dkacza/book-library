import {MainViewTemplate} from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import AddBookForm from 'components/organisms/AddBookForm/AddBookForm';
import useAddBook from 'hooks/useAddBook';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const AddBookView = () => {
  const {
    submitWithPrevent,
    register,
    file,
    setFile,
    handleImageSelection,
    addBookError,
    addBookSuccess,
  } = useAddBook();

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Add book</Title>
        <AddBookForm
          submitWithPrevent={submitWithPrevent}
          register={register}
          errors={addBookError?.formError}
          file={file}
          handleImageSelection={handleImageSelection}
          setFile={setFile}
        />
        {addBookError?.dataProviderError ? (
          <FloatingMessage error={addBookError.dataProviderError} />
        ) : (
          ''
        )}
        {addBookSuccess?.message ? <FloatingMessage success={addBookSuccess.message} /> : ''}
      </main>
    </MainViewTemplate>
  );
};
export default AddBookView;
