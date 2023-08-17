import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import AddBookForm from 'components/organisms/AddBookForm/AddBookForm';
import useAddBook from 'hooks/useAddBook';

const AddBookView = () => {
  const {submitWithPrevent, register, errors, file,handleImageSelection, errorMsg, successMsg} = useAddBook();

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Add book</Title>
        <AddBookForm
          submitWithPrevent={submitWithPrevent}
          register={register}
          errors={errors}
          file={file}
          handleImageSelection={handleImageSelection}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      </main>
    </MainViewTemplate>
  );
};
export default AddBookView;
