import styled from 'styled-components';
import Title from 'components/atoms/Title';
import FloatingMessage from 'components/molecules/FloatingMessage/FloatingMessage';

const StartingViewTemplate = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  aside {
    flex-grow: 2;
  }

  main {
    flex-grow: 1;
    min-width: 30rem;
    max-width: 33.33vw;
    padding: 5rem;
    display: flex;
    flex-direction: column;

    ${Title} {
      max-width: 20rem
    }
  }
  ${FloatingMessage} {
    position: absolute;
    top: 3rem;
    right: 3rem;
  }

  @media (max-width: 1100px) {
    main {
      max-width: 400px;
    }
  }
  @media (max-width: 1300px) {
    main {
      max-width: 480px;
      padding: 3rem;
    }
  }
  @media (min-width: 2000px) {
    main {
      max-width: 800px;
    }
  }
  @media (min-width: 2600px) {
    main {
      max-width: 1000px;
    }
  }
`;
export default StartingViewTemplate;
