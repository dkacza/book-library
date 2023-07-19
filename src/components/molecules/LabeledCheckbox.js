import React from 'react';
import styled from 'styled-components';

// https://moderncss.dev/pure-css-custom-checkbox-style/
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  
  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    
    font: inherit;
    color: currentColor;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.15em solid ${({theme}) => theme.colors.primary3};
    /* ...existing styles */
    
    display: grid;
    place-content: center;
    border-radius: 0.25rem;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.15rem;
    transform: scale(0);
    transition: 80ms transform ease-in-out;
    box-shadow: inset 1em 1em ${({theme}) => theme.colors.secondary1};
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
  label {
    padding-left: 1rem;
    font-family: 'Roboto Slab', monospace;
    color: ${({theme}) => theme.colors.secondary2};
  }
`;

const LabeledCheckbox = ({ id, label }) => {
  return (
    <Wrapper>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{label}</label>
    </Wrapper>
  );
};

export default LabeledCheckbox;