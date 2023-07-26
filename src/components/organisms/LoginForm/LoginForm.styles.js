import styled from 'styled-components';

export const StyledForm = styled.form`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;

  .icon-input {
    margin-bottom: 2.5rem;
  }

  .icon-input:nth-child(2) {
    margin-bottom: 1rem;
  }

  .submit-button {
    margin-top: 3rem;
  }

  div.message-section {
    margin-top: 1.25rem;
    height: 2rem;
    margin-bottom: 1rem;

    p.error {
      color: ${({ theme }) => theme.colors.error1};
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
`;