import styled from 'styled-components';

const StartingViewTemplate = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  aside {
    flex-grow: 80;
  }
  main {
    flex-grow: 40;
    max-width: 680px;
  }
  @media (max-width: 1100px) {
    main {
      max-width: 400px;
    }
  }
  @media (max-width: 1300px) {
    main {
      max-width: 480px;
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