import styled from 'styled-components';

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 0.16rem;
  line-height: 90%;
  color: ${({theme}) => theme.colors.secondary2}
`;

export default Title;
