import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from 'components/molecules/Logo/Logo';
import NavigationWrapper from 'components/molecules/Navigation/Navigation.styles';

const Navigation = () => {
  return (
    <NavigationWrapper>
      <Logo className="logo small black" >Municipal Library</Logo>

      <div className='user-name'>
        Dawid Kacza
      </div>

      <div className="icon-container">
        <div className="icon-link">
          <div className="icon">✔</div>
          <NavLink to="/catalogue">Catalogue</NavLink>
        </div>
      </div>

      <div className="icon-link">
        <div className="icon">❌</div>
        <NavLink to="/catalogue">Logout</NavLink>
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;
