import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';

const StyledForm = styled.form`
  margin-top: 3rem;

  ${InputWithIcon} {
    height: 3rem;
    margin-bottom: 1.25rem;
    border-radius: 0.25rem;
  }

  ${InputWithIcon}:nth-last-child(1) {
    margin-bottom: 0.25rem;
  }

  ${SubmitButton} {
    width: 100%;
    margin-top: 2rem;
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  div.message-section {
    margin-top: 1.25rem;
    margin-bottom: 1rem;
    height: 4rem;

    p.error {
      color: ${({ theme }) => theme.colors.error1};
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
  @media (max-width: 1300px) {
    margin-top: 2rem;
    ${InputWithIcon} {
      margin-bottom: 0.75rem;
      height: 2.5rem;
      input {
        font-size: 1rem;
      }
    }
    ${SubmitButton} {
      height: 2.5rem;
      font-size: 1rem;
      margin-top: 1rem;
    }
    div.message-section {
      margin-top: 0.75rem;
      margin-bottom: 1rem;
      height: 2.5rem;
      

      p.error {
        color: ${({ theme }) => theme.colors.error1};
        font-weight: bold;
        font-size: 1rem;
        text-overflow: ellipsis;
        overflow: hidden;
        
      }
    }
  }
`;
export default StyledForm;