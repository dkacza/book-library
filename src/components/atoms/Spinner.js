import styled from 'styled-components';

const Spinner = styled.div`
  position: absolute;
  top: calc(50% - 3rem);
  left: calc(50% - 3rem);
  width: 6rem;
  height: 6rem;
  border: 0.5rem solid ${({theme}) => theme.colors.primary3};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
