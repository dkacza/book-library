import styled from 'styled-components';

const MainViewTemplate = styled.div`
  display: flex;
  flex-direction: row;
  nav {
    width: 14rem;
    height: 100vh;
  }
  main {
    flex-grow: 1;
  }
`;

export default MainViewTemplate;