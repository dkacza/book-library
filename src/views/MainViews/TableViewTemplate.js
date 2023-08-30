import styled from 'styled-components';

const TableViewTemplate = styled.section`
  display: grid;
  grid-template-columns: 65% 1fr;
  column-gap: 2.5rem;
  grid-template-rows: 85% 15%;
  max-height: 100%;

  @media (max-width: 1300px) {
    column-gap: 0.75rem;
  }
`;

export default TableViewTemplate;
