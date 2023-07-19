import styled from 'styled-components';

const StartingViewsStyles = styled.div`
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
    flex-grow: 20;
    min-width: 500px;
  }
  button.languageToggle {
    position: absolute;
    bottom: 5rem;
    right: 5rem;
  }
`;
export default StartingViewsStyles;