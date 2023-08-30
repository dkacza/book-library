import {MainViewTemplate} from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import Table from 'components/organisms/Table/Table';
import Pagination from 'components/molecules/Pagination/Pagination';
import useHistory from 'hooks/useHistory';
import HistoryFilters from 'components/organisms/HistoryFilters/HistoryFilters';
import TableViewTemplate from 'views/MainViews/TableViewTemplate';
import FloatingErrorMessage from 'components/molecules/FloatingMessage/FloatingMessage';
import React from 'react';

const columnNames = ['Title', 'Name', 'Start date', 'Return date', 'Expiration', 'Status'];
const columnCodes = [
  'title',
  'fullName',
  'startDate',
  'returnDate',
  'expirationDate',
  'currentStatus',
];
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
  const {
    authorizedHistory,
    history,
    paginationData,
    register,
    handlePageChange,
    handleClearFields,
    submitWithPrevent,
    historyError,
  } = useHistory(INITIAL_FORM_VALUES);

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>History</Title>
        <TableViewTemplate>
          {history.length > 0 ? (
            <Table
              data={history}
              columnNames={columnNames}
              columnCodes={columnCodes}
              columnproportions={columnProportions}
            />
          ) : (
            <p className="empty-data-error-msg">
              No history records matching current criteria found
            </p>
          )}

          <HistoryFilters
            errors={historyError?.formError}
            onSubmit={e => submitWithPrevent(e)}
            register={register}
            authorizedHistoryView={authorizedHistory}
            handleClearFields={handleClearFields}
          />
          {history.length !== 0 ? (
            <Pagination paginationData={paginationData} handlePageChange={handlePageChange} />
          ) : (
            ''
          )}
        </TableViewTemplate>
        {historyError?.dataProviderError ? (
          <FloatingErrorMessage error={historyError.dataProviderError} />
        ) : (
          ''
        )}
      </main>
    </MainViewTemplate>
  );
};
export default HistoryView;
