import React from 'react';
import StyledAsidePhoto from 'components/organisms/AsidePhoto/AsidePhoto.styles';
import Logo from 'components/molecules/Logo/Logo';
import styled from 'styled-components';
const AsidePhoto = () => {
  return (
    <StyledAsidePhoto>
      <Logo />
    </StyledAsidePhoto>
  );
};
export default styled(AsidePhoto)``;
