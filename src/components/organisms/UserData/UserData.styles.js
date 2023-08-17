import styled from 'styled-components';
import Title from 'components/atoms/Title';

const StyledUserData = styled.div`
  p {
    font-size: 1.2rem;
  }

  .not-eligible {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.error2}
  }

  ${Title} {
    margin-top: 2.5rem;
    margin-bottom: 0;
    font-size: 3rem;
  }

  margin-bottom: 2rem;
`;

export default StyledUserData;