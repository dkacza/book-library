import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import MainSection from 'components/templates/MainSection/MainSection';
import BookBrowser from 'components/templates/BookBrowser/BookBrowser';

const BooksView = () => {
  return (
    <MainViewTemplate>
      <Navigation />
      <MainSection heading="Book Catalogue" children={<BookBrowser />} />
    </MainViewTemplate>
  );
};
export default BooksView;
