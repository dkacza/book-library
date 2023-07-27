import React from 'react';
import Title from 'components/atoms/Title';
import { Wrapper } from 'components/templates/MainSection/MainSection.styles';

const MainSection = ({heading, children}) => {
  return (
    <Wrapper>
      <Title>{heading}</Title>
      {children}
    </Wrapper>
  )
}

export default MainSection;