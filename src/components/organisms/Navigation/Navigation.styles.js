import styled from 'styled-components';
import Logo from 'components/molecules/Logo/Logo';
import Title from 'components/atoms/Title';
import NavWithIcon from 'components/molecules/NavWithIcon/NavWithIcon';

const StyledNavigation = styled.nav`
  background-color: ${({theme}) => theme.colors.primary2};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);

  ${Logo} {
    margin: 3rem auto;
    color: ${({theme}) => theme.colors.secondary2};

    ${Title} {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
      letter-spacing: 0;
    }
  }

  .user-name {
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    font-family: 'Raleway', sans-serif;
    margin: 2rem 0;
  }

  .nav-container {
    margin-bottom: 2rem;

    .public {
      margin-bottom: 2rem;
    }
  }

  @media (max-height: 800px) {
    ${Logo} {
      margin: 2rem auto;
    }

    .nav-container {
      ${NavWithIcon} {
        height: 3.5rem;
      }
    }
  }
`;

export default StyledNavigation;
