import { MainViewTemplate } from 'views/MainViews/MainViewTemplate';
import Navigation from 'components/organisms/Navigation/Navigation';
import Title from 'components/atoms/Title';
import StyledContentSection from 'views/MainViews/UsersView/UsersView.styles';
import useUsers from 'hooks/useUsers';
import Table from 'components/organisms/Table/Table';
import Pagination from 'components/molecules/Pagination/Pagination';
import UserFilters from 'components/organisms/UserFilters/UserFilters';

const columnNames = ['Full name', 'Email address', 'Registration', 'Role', 'Eligible'];
const columnCodes = ['fullName', 'email', 'registrationDate', 'role', 'eligible'];
const columnProportions = [0.3, 0.3, 0.2, 0.1, 0.1];
const INITIAL_PAGE = 1;
const INITIAL_FORM_VALUES = {
  registrationDateFrom: undefined,
  registrationDateTo: undefined,
  role: {
    user: true,
    librarian: true,
    admin: true,
  },
};

const UsersView = () => {
  const { users, paginationData, register, handlePageChange, submitWithPrevent } = useUsers(
    INITIAL_FORM_VALUES,
  );

  return (
    <MainViewTemplate>
      <Navigation />
      <main>
        <Title>Users</Title>
        <StyledContentSection>
          <Table
            data={users}
            columnNames={columnNames}
            columnCodes={columnCodes}
            columnproportions={columnProportions}
            routePath={"/user"}
          />
          <UserFilters onSubmit={(e) => submitWithPrevent(e)} register={register} />
          {users.length !== 0 ? <Pagination paginationData={paginationData} handlePageChange={handlePageChange} /> : ''}
        </StyledContentSection>
      </main>
    </MainViewTemplate>
  );
};
export default UsersView;
