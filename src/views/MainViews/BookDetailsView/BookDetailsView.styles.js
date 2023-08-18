import styled from 'styled-components';
import BookDetailsLinkContainer from 'components/organisms/BookDetailsLinkContainer';
import BookImage from 'components/molecules/BookImage/BookImage';

const StyledContentSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;

  .book-data-container {
    flex-basis: 90%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: 100%;
    
    ${BookImage} {
      margin-right: 2rem;
    }
  }

  ${BookDetailsLinkContainer} {
    flex-basis: 10%;
  }
`;

export default StyledContentSection;
