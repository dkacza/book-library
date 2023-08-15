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
  const { authorizedHistory, history, paginationData, register, handlePageChange, submitWithPrevent } =
    useHistory(INITIAL_FORM_VALUES);

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>History</Title>
        <StyledContentSection>
          <Table
            data={history}
            columnNames={columnNames}
            columnCodes={columnCodes}
            columnproportions={columnProportions}
          />
          <HistoryFilters
            onSubmit={(e) => submitWithPrevent(e)}
            register={register}
            authorizedHistoryView={authorizedHistory}
          />
          {history.length !== 0 ? (
            <Pagination paginationData={paginationData} handlePageChange={handlePageChange} />
          ) : (
            ''
          )}
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};
export default HistoryView;
