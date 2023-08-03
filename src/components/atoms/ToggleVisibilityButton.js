import React from 'react';
import { ReactComponent as VisibleIcon } from 'assets/icons/visibility_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as InvisibleIcon } from 'assets/icons/visibility_off_FILL0_wght600_GRAD0_opsz48.svg';
import styled from 'styled-components';

const ToggleVisibilityButton = ({visible, ...props}) => {
  const Icon = !visible ? VisibleIcon : InvisibleIcon;
  return (
    <button {...props}>
      <Icon></Icon>
    </button>
  )
}
export default styled(ToggleVisibilityButton)``;