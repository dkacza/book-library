import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavWithIcon = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0.75rem;
  color: ${({ theme }) => theme.colors.secondary2};
  text-decoration: none;
  position: relative;
  z-index: 1;

  .icon-container {
    width: 3rem;
    margin-left: 0.5rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    width: 2rem;
    margin-right: 1rem;
  }

  p {
    font-size: 1.4rem;
    font-family: 'Raleway', sans-serif;
  }

  &.active {
    font-weight: bold;
    position: relative;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      animation-name: slideIn;
      animation-duration: 0.2s;
      content: "";
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.primary3};
      z-index: -1;
    }
  }

  @keyframes slideIn {
    0% {
      left: -100%;
    }
    100% {
      left: 0;
    }
  }
`;

export default StyledNavWithIcon;