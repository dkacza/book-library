import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import BorrowingsManager from 'components/templates/BorrowingsManager/BorrowingsManager';
import Title from 'components/atoms/Title';

const ManageBorrowings = () => {
  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Manage Borrowings</Title>
        <BorrowingsManager />
      </main>
    </MainViewTemplate>
  );
};
export default ManageBorrowings;
