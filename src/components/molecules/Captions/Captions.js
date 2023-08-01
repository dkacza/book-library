import React from 'react';

const Captions = ({returnSelected, toggleAction}) => {
  return (
    <div className="captions">
      <button className="first-caption">{returnSelected ? 'Return' : 'Borrow'}</button>
      <button className="second-caption" onClick={toggleAction}>
        {returnSelected ? 'Borrow' : 'Return'}
      </button>
    </div>
  )
}

export default Captions;