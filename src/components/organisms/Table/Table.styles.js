import styled from 'styled-components';

const StyledTable = styled.table`
  display: block;
  position: relative;
  max-height: 100%;
  border-collapse: collapse;
  overflow-y: scroll;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    opacity: 1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.colors.secondary1};
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.colors.secondary2};
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  th {
    font-size: 2rem;
    text-align: left;
    color: ${({theme}) => theme.colors.secondary2};
    font-family: 'Raleway', sans-serif;
    padding-right: 2rem;
  }

  th.long {
    font-size: 1.5rem;
  }

  // Table proportions
  ${props => {
    return props.$columnproportions.map((columnSize, index) => {
      return `th:nth-child(${index + 1}), td:nth-child(${index + 1}) {width: ${
        columnSize * 100
      }%;}`;
    });
  }}
  thead {
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.colors.primary1};
  }

  td {
    font-family: 'Roboto Slab', monospace;
    font-size: 1.25rem;
    padding: 0.75rem 2rem 0.75rem 0;
  }

  tr {
    border-bottom: 1px solid ${({theme}) => theme.colors.secondary1};
    margin: 0 1rem;
  }

  tr.active {
    color: ${({theme}) => theme.colors.accept3};
  }

  tr.lost {
    color: ${({theme}) => theme.colors.error2};
  }

  thead tr:nth-child(1) {
    border: none;
  }
  &.selectable {
    tbody {
      tr {
        cursor: pointer;
        transition: 0.15s;
      }
      tr:hover {
        font-weight: bold;
      }
    }
  }

  @media (max-width: 1440px) {
    th {
      font-size: 2rem;
    }

    td {
      font-size: 1rem;
    }
  }

  @media (max-width: 1280px) {
    td {
      font-size: 0.75rem;
    }

    th.long {
      font-size: 1.5rem;
    }
    th {
      font-size: 1.25rem;
    }
  }
  @media (max-width: 1100px) {
    th.long {
      font-size: 1rem;
    }
  }
`;

export default StyledTable;
