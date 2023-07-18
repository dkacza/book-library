import React from 'react';
import Title from 'components/atoms/Title';
import { Wrapper } from 'components/molecules/Logo.styles';

const Logo = ({ ...props }) => {
  return (
    <Wrapper {...props}>
      <Title>
        Municipal <br /> Library
      </Title>
      <p>Skoczów municipality</p>
    </Wrapper>
  );
};

export default Logo;
