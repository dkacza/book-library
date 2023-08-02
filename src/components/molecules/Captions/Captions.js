import React from 'react';
import StyledCaptions from 'components/molecules/Captions/Captions.styles';

const Captions = ({returnSelected, toggleAction}) => {
  return (
    <StyledCaptions className="captions">
      <button className="first-caption">{returnSelected ? 'Return' : 'Borrow'}</button>
      <button className="second-caption" onClick={toggleAction}>
        {returnSelected ? 'Borrow' : 'Return'}
      </button>
    </StyledCaptions>
  )
}

export default Captions;