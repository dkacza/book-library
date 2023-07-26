import styled from 'styled-components';
import Title from 'components/atoms/Title';

export const Wrapper = styled.div`
  text-align: right;
  width: min-content;
  
  ${Title} {
    color: ${({theme}) => theme.colors.primary1};
  }
  p {
    margin-top: 0.6rem;
    font-size: 1.125rem;
    letter-spacing: 0.05rem;
    color: ${({theme}) => theme.colors.primary1};
  }
  
  &.small {
    ${Title} {
      font-size: 2rem;
      letter-spacing: 0.1rem;
    }
    p {
      margin-top: 0.6rem;
      font-size: 0.8rem;
      letter-spacing: 0.04rem;
    }
  }
  &.black {
    ${Title} {
      color: ${({theme}) => theme.colors.secondary2};
    }
    p {
      color: ${({theme}) => theme.colors.secondary2};
    }
  }
`;
