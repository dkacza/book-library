import React from 'react';
import styled from 'styled-components';

const DateInput = React.forwardRef(({...props}, ref) => {
  return <input type="date" {...props} ref={ref}/>;
})
export default styled(DateInput)`
  border: 2px solid ${({theme}) => theme.colors.primary3};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  font-size: 1rem;
  max-width: 9rem;
  border-bottom: 3px solid ${({theme}) => theme.colors.primary3};
  outline: none;
  background: none;
  color: ${({theme}) => theme.colors.secondary2};
`;