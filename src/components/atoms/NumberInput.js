import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: 2px solid ${({theme}) => theme.colors.primary3};
  border-radius: 0.4rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  width: 8rem;
  border-bottom: 3px solid ${({theme}) => theme.colors.primary3};
  outline: none;
  background-color: ${({theme}) => theme.colors.primary1};
`;

const NumberInput = React.forwardRef(({ name, id, value, onChange, ...props }, ref) => {
  return <StyledInput type="number" name={name} id={id} value={value} ref={ref} {...props} />;
});

export default NumberInput;