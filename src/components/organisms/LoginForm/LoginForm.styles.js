import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';

export const StyledForm = styled.form`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;

  ${InputWithIcon} {
    margin-bottom: 2.5rem;
  }

  ${InputWithIcon}:nth-child(2) {
    margin-bottom: 1rem;
  }

  ${SubmitButton} {
    margin-top: 3rem;
  }

  div.message-section {
    margin-top: 1.25rem;
    margin-bottom: 1rem;

    p.error {
      color: ${({ theme }) => theme.colors.error1};
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
`;