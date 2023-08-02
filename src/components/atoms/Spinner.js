import styled from 'styled-components';

const Spinner = styled.div`
  position: absolute;
  top: calc(50% - 72px);
  left: calc(50% - 72px);
  width: 72px;
  height: 72px;
  border: 6px solid ${({theme}) => theme.colors.primary3};
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
  } `

export default Spinner;