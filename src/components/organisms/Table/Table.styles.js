import styled from 'styled-components';

const StyledTable = styled.table`
  display: block;
  position: relative;
  max-height: 100%;
  padding-right: 2rem;
  border-collapse: collapse;
  overflow-y: scroll;
  overflow-x: scroll;
  th {
    font-size: 3rem;
    text-align: left;
    color: ${({theme}) => theme.colors.secondary2}
  }
  thead {
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.colors.primary1};
  }
  td {
    font-family: 'Roboto Slab', monospace;
    font-size: 1.25rem;
    padding: 0.75rem 1rem 0.75rem 0;
  }
  tr {
    border-bottom: 1px solid ${({theme}) => theme.colors.secondary1};
    margin: 0 1rem;
  }
  thead tr:nth-child(1) {
    border: none;
  }
  td:nth-child(1) {
    width: 30%;
  }
  td:nth-child(2) {
    width: 25%;
  }
  td:nth-child(3) {
    width: 25%;
  }
  td:nth-child(4) {
    width: 15%;
  }
  
  @media (max-width: 1280px) {
    th {
      font-size: 2.25rem;
    }
  }
`;

export default StyledTable;