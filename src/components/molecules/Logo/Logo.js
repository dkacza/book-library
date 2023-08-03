import React from 'react';
import Title from 'components/atoms/Title';
import { StyledLogo } from 'components/molecules/Logo/Logo.styles';
import styled from 'styled-components';

const Logo = ({...props}) => {
  return (
    <StyledLogo className={props.className}>
      <Title>
        Municipal <br /> Library
      </Title>
      <p>Skoczów municipality</p>
    </StyledLogo>
  );
};

export default styled(Logo)``;
