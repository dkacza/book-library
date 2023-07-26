import styled from 'styled-components';

const LoadingDots = styled.div`
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${({theme}) => theme.colors.primary3};
  color: ${({theme}) => theme.colors.primary3};
  animation: dot-flashing 1s infinite linear alternate;
  transform: translate(1.25rem, 50%);
  animation-delay: 0.2s;

  &::before, &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -1.25rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primary3};
    color: ${({theme}) => theme.colors.primary3};
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 1.25rem;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primary3};
    color: ${({theme}) => theme.colors.primary3};
    animation: dot-flashing 1s infinite alternate;
    animation-delay: 0.4s;
  }

  @keyframes dot-flashing {
    0% {
      background-color: ${({theme}) => theme.colors.primary2};
    }
    50%, 100% {
      background-color: ${({theme}) => theme.colors.primary3};
    }
  }
`;

export default LoadingDots;


