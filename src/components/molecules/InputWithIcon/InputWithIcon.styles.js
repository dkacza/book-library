import styled from 'styled-components';

export const StyledInputWithIcon = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    font-size: 1.25rem;
  }

  display: flex;
  flex-direction: row;
  border: 0.25rem solid ${({ theme }) => theme.colors.primary3};
  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.primary3};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: 0.2s;

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: unset;
    border-right: 0.25rem solid ${({ theme }) => theme.colors.primary3};
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

  .toggle-visibility {
    cursor: pointer;
  }

  label {
    display: none;
  }

  input {
    border: none;
    display: block;
    background-color: ${({ theme }) => theme.colors.primary1};
    font-size: 1.25rem;
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

  &.error {
    border: 0.25rem solid ${({ theme }) => theme.colors.error2};
    border-bottom: 0.4rem solid ${({ theme }) => theme.colors.error2};

    .icon-wrapper {
      border-right: 0.25rem solid ${({ theme }) => theme.colors.error2};

      svg {
        color: ${({ theme }) => theme.colors.error1};
      }
    }
  }

`;
