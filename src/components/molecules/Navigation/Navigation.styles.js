import styled from 'styled-components';

const NavigationWrapper = styled.nav`
  background-color: ${({theme}) => theme.colors.primary2};
  
  .logo {
    margin: 3rem auto;
  }
  
  .user-name {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem 0;
  }
  .nav-container {
    margin-bottom: 2rem;
    .public {
      margin-bottom: 2rem;
    }
  }
  .logout {
    margin-top: 6rem;
  }
`;

export default NavigationWrapper;