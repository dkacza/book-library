import React from 'react';
import StyledNavWithIcon from 'components/molecules/NavWithIcon/NavWithIcon.styles';
import styled from 'styled-components';

const NavWithIcon = ({destination, Icon, name, onClick, ...props}) => {
  return (
    <StyledNavWithIcon className={props.className} onClick={onClick} to={destination}>
      <div className='icon-container'>
        <Icon></Icon>
      </div>
      <p>{name}</p>
    </StyledNavWithIcon>
  );
}

export default styled(NavWithIcon)``;