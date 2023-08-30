import styled from 'styled-components';
import Title from 'components/atoms/Title';

const StyledUserData = styled.div`
  p {
    font-size: 1.25rem;
  }

  .not-eligible {
    font-weight: bold;
    color: ${({theme}) => theme.colors.error2};
  }

  ${Title} {
    font-size: 2rem;
  }

  margin-bottom: 2rem;
  @media (max-height: 800px) {
    ${Title}.user-name {
      font-size: 2rem;
      margin-bottom: 0;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export default StyledUserData;
