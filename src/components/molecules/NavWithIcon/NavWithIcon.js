import React from 'react';
import StyledNavLink from 'components/molecules/NavWithIcon/NavWithIcon.styles';

const NavWithIcon = ({destination, Icon, name, onClick}) => {
  return (
    <StyledNavLink className="nav-link" onClick={onClick} to={destination}>
      <div className='icon-container'>
        <Icon></Icon>
      </div>
      <p>{name}</p>
    </StyledNavLink>
  );
}

export default NavWithIcon;