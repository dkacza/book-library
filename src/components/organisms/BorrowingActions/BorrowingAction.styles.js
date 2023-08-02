import styled from 'styled-components';

const StyledBorrowingActions = styled.div`
  .user-data {
    p {
      font-family: 'Roboto Slab', monospace;
      font-size: 1.2rem;
    }
    .title {
      margin-top: 2.5rem;
      margin-bottom: 0;
      font-size: 3rem;
    }
    margin-bottom: 2rem;
  }
  .unset-user {
    margin-bottom: 2rem;
  }
  .content {
    border: 6px solid ${({theme}) => theme.colors.primary3};
    border-radius: 0 0.5rem 0.5rem 0.5rem;
    box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.25);
    padding: 2rem;
    max-width: fit-content;
  }
`;
export default StyledBorrowingActions;
