import styled from 'styled-components';
import SquareTileButton from 'components/atoms/SquareTileButton';

const StyledReturns = styled.div`
  height: 100%;
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
    background-color: ${({theme}) => theme.colors.primary1};
    font-weight: bold;
    font-size: 1.25rem;
    // Prevent the text showing through the top border
    transform: translateY(-1px);
  }
  li {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 0.1rem solid ${({theme}) => theme.colors.secondary1};
    margin-right: 2rem;
    width: fit-content;
  }
  p {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  p:nth-child(1) {
    width: 16rem;
  }
  p:nth-child(2) {
    width: 8rem;
  }
  p:nth-child(3) {
    width: 8rem;
  }
  
  ${SquareTileButton} {
    margin: 0 0.75rem 0.75rem 2rem;
  }
`;

export default StyledReturns;