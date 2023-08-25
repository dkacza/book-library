import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SquareTileButton from 'components/atoms/SquareTileButton';

const StyledBorrowings = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  ${InputWithIcon} {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    height: 3rem;
    width: 24rem;
    flex-shrink: 0;
  }
  .tip {
    margin-top: 0.2rem;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${({theme}) => theme.colors.secondary1};
  }

  .book-list {
    height: 100%;
    width: 100%;
    list-style: none;
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

    .list-headings {
      display: flex;
      position: sticky;
      top: 0;
      left: 0;
      background-color: ${({ theme }) => theme.colors.primary1};
      font-weight: bold;
      font-size: 1.25rem;
      // Prevent the text showing through the top border
      transform: translateY(-1px);
    }

    li {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid ${({ theme }) => theme.colors.secondary1};
      align-items: center;

      ${SquareTileButton} {
        margin-top: 0.5rem;
        margin-bottom: 0.75rem;
        margin-right: 1rem;
      }
    }
    p:nth-child(1) {
      flex-basis: 14rem;
    }
    p:nth-child(2) {
      flex-basis: 10rem;
    }
    p:nth-child(3) {
      flex-basis: 8rem;
    }
    ${SquareTileButton} {
      margin: 0 0.75rem 0.75rem 2rem;
    }
  }
`;

export default StyledBorrowings;