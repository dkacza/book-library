import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';

const StyledForm = styled.form`
  margin-top: 3rem;

  ${InputWithIcon} {
    height: 3rem;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
  }

  ${InputWithIcon}:nth-last-child(1) {
    margin-bottom: 0.5rem;
  }

  ${SubmitButton} {
    width: 100%;
    margin: 1rem 0;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  p.error-message {
    color: ${({ theme }) => theme.colors.error1};
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }


  @media (max-width: 1300px) {
    margin-top: 2rem;
    ${InputWithIcon} {
      margin-bottom: 0.5rem;

      input {
        font-size: 1rem;
      }
    }

    ${SubmitButton} {
      width: 100%;
      height: 2.5rem;
      font-size: 1rem;
      margin: 2rem 0;
    }
  }
`;
export default StyledForm;