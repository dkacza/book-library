import React from 'react';
import StyledNavLink from 'components/molecules/NavWithIcon/NavWithIcon.styles';

const NavWithIcon = ({destination, Icon, name}) => {
  return (
    <StyledNavLink to={destination}>
      <div className='icon-container'>
        <Icon></Icon>
      </div>
      <p>{name}</p>
    </StyledNavLink>
  );
}

export default NavWithIcon;