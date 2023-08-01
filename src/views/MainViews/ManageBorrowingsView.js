import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/molecules/Navigation/Navigation';
import MainSection from 'components/templates/MainSection/MainSection';
import BorrowingsManager from 'components/templates/BorrowingsManager/BorrowingsManager';

const ManageBorrowings = () => {
  return (
    <MainViewTemplate>
      <Navigation />
      <MainSection heading="Manage Borrowings" children={<BorrowingsManager/>} />
    </MainViewTemplate>
  );
};
export default ManageBorrowings;
