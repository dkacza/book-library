import styled from 'styled-components';

const StyledReturns = styled.ul`  
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
  }
  
  p:nth-child(1) {
    width: 14rem;
  }
  p:nth-child(2) {
    width: 11rem;
  }
  p:nth-child(3) {
    width: 12rem;
  }
  
  button {
    margin-bottom: 0.75rem;
  }
`;

export default StyledReturns;