import styled from 'styled-components';
import Title from 'components/atoms/Title';

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
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    padding: 3rem;

    ${Title} {
      margin-bottom: 2rem;
      font-size: 3.5rem;
    }

    & > section {
      flex-grow: 1;
      overflow: hidden;
    }
  }

  @media (max-width: 1300px) {
    main {
      padding: 2rem;
    }
  }
`;