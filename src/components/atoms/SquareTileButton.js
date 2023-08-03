import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary2};
  color: ${({ theme }) => theme.colors.secondary1};
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary3};
    cursor: pointer;
  }
`;

const SquareTileButton = ({Icon, onClick, ...props}) => {
  return (
    <StyledButton className={props.className} onClick={onClick}>
      <Icon></Icon>
    </StyledButton>
  )
}

export default styled(SquareTileButton)``;