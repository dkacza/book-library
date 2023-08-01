import styled from 'styled-components';

const NavigationWrapper = styled.nav`
  background-color: ${({theme}) => theme.colors.primary2};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  
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
  
  @media(max-width: 1300px) {
    .logo {
      margin: 2rem auto;
    }
    .nav-container {
      .nav-link {
        height: 3.5rem;
      }
    }
  }
`;

export default NavigationWrapper;