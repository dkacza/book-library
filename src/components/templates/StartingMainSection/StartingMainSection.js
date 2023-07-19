import React from 'react';
import Title from 'components/atoms/Title';
import { Wrapper } from 'components/templates/StartingMainSection/StartingMainSection.styles';

const StartingMainSection = ({heading, children}) => {
  return (
    <Wrapper>
      <Title>{heading}</Title>
      {children}
    </Wrapper>
  );
};

export default StartingMainSection;