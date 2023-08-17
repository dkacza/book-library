import styled from 'styled-components';

const StyledLabeledCheckbox = styled.div`
  // https://moderncss.dev/pure-css-custom-checkbox-style/
  display: flex;
  flex-direction: row;

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;

    font: inherit;
    color: currentColor;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.15rem solid ${({ theme }) => theme.colors.primary3};

    display: grid;
    place-content: center;
    border-radius: 0.2rem;
  }

  input[type='checkbox']::before {
    content: '';
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 0.15rem;
    transform: scale(0);
    transition: 80ms transform ease-in-out;
    box-shadow: inset 1em 1em ${({ theme }) => theme.colors.secondary1};
  }

  input[type='checkbox']:checked::before {
    transform: scale(1);
  }

  label {
    padding-left: 1rem;
  }
`;

export default StyledLabeledCheckbox;