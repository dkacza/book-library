import styled from 'styled-components';
import { StyledLink } from 'components/atoms/StyledLink';
import BorderlessButton from 'components/atoms/BorderlessButton';
import BookImage from 'components/organisms/BookImage/BookImage';

const StyledContentSection = styled.section`
  display: flex;
  flex-direction: column;
  .book-data {
    flex-basis: 80%;
    padding-top: 2rem;
  }
  .links-container {
    flex-basis: 20%;
    padding-top: 2rem;
  }
  ${StyledLink}, ${BorderlessButton} {
    font-size: 1.25rem;
    margin-right: 2rem;
  }
  .discard {
    color: ${({theme}) => theme.colors.primary3}
  }
  .book-data {
    display: flex;
    flex-direction: row;
    
    ${BookImage} {
      margin-right: 2rem;
    }
  }
`;

export default StyledContentSection;