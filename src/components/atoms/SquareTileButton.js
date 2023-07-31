import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: ${({theme}) => theme.colors.primary2};
  color: ${({theme}) => theme.colors.secondary1};
  border-radius: 0.25rem;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 2.5rem;
  height: 2.5rem;
  &:hover {
    background-color: ${({theme}) => theme.colors.primary3};
    cursor: pointer;
  }
`;

const SquareTileButton = ({Icon, onClick}) => {
  return (
    <StyledButton onClick={onClick}>
      <Icon></Icon>
    </StyledButton>
  )
}

export default SquareTileButton;