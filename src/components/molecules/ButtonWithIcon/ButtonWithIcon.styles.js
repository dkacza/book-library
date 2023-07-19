import styled from 'styled-components';

// eslint-disable-next-line no-mixed-operators
export const ButtonWrapper = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    transition: background-color 5000s ease-in-out 0s;
  }

  border: 3px solid ${({ theme }) => theme.colors.primary3};
  border-bottom: 6px solid ${({ theme }) => theme.colors.primary3};
  border-radius: 0.75rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  height: 4rem;
  display: flex;
  flex-direction: row;

  .iconWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: unset;
    border-right: 4px solid ${({ theme }) => theme.colors.primary3};
    height: 100%;
    aspect-ratio: 1/1;

    &:nth-last-child(1) {
      border: none;
    }

    svg {
      height: 60%;
      color: ${({ theme }) => theme.colors.secondary1};
    }
  }

  label {
    display: none;
  }

  input {
    border: none;
    display: block;
    background-color: ${({ theme }) => theme.colors.primary1};
    font-size: 1.25rem;
    font-family: 'Roboto Slab', monospace;
    flex-grow: 1;
    width: 0;
    color: ${({ theme }) => theme.colors.secondary2};
    padding-left: 1rem;
    margin-right: 1rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.secondary1};
    }
  }

`;
