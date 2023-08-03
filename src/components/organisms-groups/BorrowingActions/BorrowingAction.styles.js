import styled from 'styled-components';
import BorderlessButton from 'components/atoms/BorderlessButton';
import Returns from 'components/organisms/Returns/Returns';
import Borrowings from 'components/organisms/Borrowings/Borrowings';

const StyledBorrowingActions = styled.div`
  ${BorderlessButton} {
    margin-bottom: 2rem;
  }

  ${Returns}, ${Borrowings} {
    border: 6px solid ${({ theme }) => theme.colors.primary3};
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.25);
    padding: 2rem;
    max-width: 50rem;
  }
`;
export default StyledBorrowingActions;
