import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import Table from 'components/organisms/Table/Table';
import Pagination from 'components/molecules/Pagination/Pagination';
import useHistory from 'hooks/useHistory';
import HistoryFilters from 'components/organisms/HistoryFilters/HistoryFilters';
import StyledContentSection from 'views/MainViews/HistoryView/HistoryView.styles';

const columnNames = ['Title', 'Name', 'Start date', 'Return date', 'Expiration', 'Status'];
const columnCodes = ['title', 'fullName', 'startDate', 'returnDate', 'expirationDate', 'currentStatus'];
const columnProportions = [0.3, 0.15, 0.15, 0.15, 0.15, 0.1];
const INITIAL_PAGE = 1;
const INITIAL_FORM_VALUES = {
  startDateFrom: undefined,
  startDateTo: undefined,
  returnDateFrom: undefined,
  returnDateTo: undefined,
  status: {
    active: true,
    returned: true,
    lost: true,
  },
};

const HistoryView = () => {
  const { historyRecords, pages, register, handlePageChange, submitWithPrevent, authorizedHistoryView } = useHistory(
    INITIAL_FORM_VALUES,
    INITIAL_PAGE,
    columnCodes,
  );

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>History</Title>
        <StyledContentSection>
          <Table
            data={historyRecords}
            columnNames={columnNames}
            columnCodes={columnCodes}
            columnproportions={columnProportions}
          />
          <HistoryFilters
            onSubmit={(e) => submitWithPrevent(e)}
            register={register}
            authorizedHistoryView={authorizedHistoryView}
          />
          {historyRecords.length !== 0 ? <Pagination pages={pages} handlePageChange={handlePageChange} /> : ''}
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};
export default HistoryView;
