import styled from 'styled-components';
import BorderlessButton from 'components/atoms/BorderlessButton';
import UserData from 'components/organisms/UserData/UserData';

const StyledBorrowingActions = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${UserData} {
    margin-bottom: 0.25rem;
  }

  ${BorderlessButton} {
    margin-bottom: 1rem;
  }
}


.management {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .action-container {
    border: 6px solid ${({theme}) => theme.colors.primary3};
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.25);
    overflow: hidden;

    padding: 1rem 2rem;

    // ADJUST WITH MEDIA QUERIES
    max-height: 20rem;
  }
`;
export default StyledBorrowingActions;
