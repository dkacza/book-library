import styled from 'styled-components';
import BookFilters from 'components/organisms/BookFilters/BookFilters';

const StyledContentSection = styled.section`
  display: grid;
  grid-template-columns: 65% 1fr;
  column-gap: 1rem;
  grid-template-rows: 85% 15%;
  max-height: 100%;
  
  ${BookFilters} {
    margin-top: 3.5rem;
  }
`;

export default StyledContentSection;