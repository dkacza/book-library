import React from 'react';
import Wrapper, { PositionedLogo } from 'components/organisms/AsidePhoto/AsidePhoto.styles';
import img from 'assets/images/aside-background.jpg';

const AsidePhoto = () => {
  return (
    <Wrapper>
      <img src={img} alt="Library" />
      <PositionedLogo></PositionedLogo>
    </Wrapper>
  );
};
export default AsidePhoto;
