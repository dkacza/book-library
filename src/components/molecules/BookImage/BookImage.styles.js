import styled from 'styled-components';
import FileInput from 'components/atoms/FileInput';

const StyledBookImage = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  flex-basis: 12rem;
  
  img {
    align-self: flex-start;
  }
  
  ${FileInput} {
    margin-top: 2rem;
  }
  
`;

export default StyledBookImage;