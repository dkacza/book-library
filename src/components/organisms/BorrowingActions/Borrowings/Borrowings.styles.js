import styled from 'styled-components';

const StyledBorrowings = styled.div`
  
  .icon-input {
    height: 3.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .book-list {
    list-style: none;
    max-height: 22vh;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      opacity: 1;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.secondary1};
      border-radius: 0.25rem;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.secondary2};
    }

    &::-webkit-scrollbar-corner {
      display: none;
    }

    li {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid ${({ theme }) => theme.colors.secondary1};
      align-items: center;
      margin-right: 2rem;

      p:nth-child(1) {
        width: 14rem;
        margin-right: 2rem;
      }

      p:nth-child(2) {
        width: 11rem;
        margin-right: 2rem;
      }

      p:nth-child(3) {
        width: 12rem;
        margin-right: 2rem;
      }

      button {
        margin-top: 0.5rem;
        margin-bottom: 0.75rem;
        margin-right: 1rem;
      }
    }
  }
  @media(max-height: 730px) {
    .icon-input {
      height: 2.75rem;
    }
    .book-list {
      max-height: 18vh;
    }
  }
`;

export default StyledBorrowings;