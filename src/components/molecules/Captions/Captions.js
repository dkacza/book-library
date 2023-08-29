import React from 'react';
import StyledCaptions from 'components/molecules/Captions/Captions.styles';
import styled from 'styled-components';

const Captions = ({returnSelected, toggleAction}) => {
  return (
    <StyledCaptions>
      <button className="first-caption">{returnSelected ? 'Return' : 'Borrow'}</button>
      <button className="second-caption" onClick={toggleAction}>
        {returnSelected ? 'Borrow' : 'Return'}
      </button>
    </StyledCaptions>
  );
};

export default styled(Captions)``;
