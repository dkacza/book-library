import React from 'react';
import styled from 'styled-components';
import StyledLabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox.styles';

const LabeledCheckbox = React.forwardRef(({ id, name, label, value, onChange, ...props }, ref) => {
  return (
    <StyledLabeledCheckbox>
      <input type="checkbox" name={name} id={id} ref={ref} value={value} onChange={onChange} {...props} />
      <label htmlFor={id}>{label}</label>
    </StyledLabeledCheckbox>
  );
});

export default styled(LabeledCheckbox)``;
