import styled from 'styled-components';

export const MainViewTemplate = styled.div`
  display: flex;
  flex-direction: row;
  nav {
    flex-basis: 14rem;
    width: 14rem;
    max-width: 14rem;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
  }
  main {
    max-width: calc(100vw - 14rem);
    flex-shrink: 1;
    flex-grow: 1;
    height: 100vh;
  }
`;