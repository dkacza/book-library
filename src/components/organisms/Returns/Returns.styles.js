import styled from 'styled-components';
import SquareTileButton from 'components/atoms/SquareTileButton';

const StyledReturns = styled.ul`
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
  .list-headings {
    display: flex;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.25rem;
  }
  li {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.secondary1};
    margin-right: 2rem;
    width: fit-content;
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
    margin-bottom: 0.75rem;
    margin-left: 2rem;
    margin-right: 0.75rem;
  }
`;

export default StyledReturns;