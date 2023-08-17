import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import BorderlessButton from 'components/atoms/BorderlessButton';
import SubmitButton from 'components/atoms/SubmitButton';
import OutlinedInput from 'components/atoms/OutlinedInput';

const StyledUserFilters = styled.form`
  display: flex;
  flex-direction: column;

  ${InputWithIcon} {
    height: 3.5rem;
    margin-bottom: 1rem;
    max-width: 24rem;
  }

  .label {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.secondary2};
    margin-bottom: 0.2rem;
  }

  .registration-date-filter {
    margin-bottom: 1rem;

    .registration-date-input {
      display: flex;
      flex-direction: row;

      * {
        margin-right: 0.5rem;
      }
    }
    ${BorderlessButton} {
      margin-top: 0.25rem;
      font-size: 1rem;
    }
  }

  p.error-msg {
    color: ${({ theme }) => theme.colors.error2};
    font-weight: bold;
    font-size: 1.25rem;
  }

  ${SubmitButton} {
    margin-top: 2rem;
    max-width: 12rem;
    font-size: 1.25rem;
  }

  @media (max-width: 1280px) {
    margin-top: 0;
    ${InputWithIcon} {
      max-width: 12rem;

      input {
        font-size: 1rem;
      }
    }

    .registration-date-filter {
      .registration-date-input {
        ${OutlinedInput} {
          padding: 0.25rem 0.1rem;
          font-size: 0.7rem;
        }
      }
    }
  }
`;

export default StyledUserFilters;