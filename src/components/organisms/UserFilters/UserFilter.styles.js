import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import BorderlessButton from 'components/atoms/BorderlessButton';
import SubmitButton from 'components/atoms/SubmitButton';
import DateInput from 'components/atoms/DateInput';

const StyledUserFilters = styled.form`
  margin-top: 1rem;

  ${InputWithIcon} {
    height: 3rem;
    border-radius: 0.4rem;
    margin-bottom: 1rem;
    max-width: 24rem;

    input {
      font-size: 1rem;
    }
  }

  .label {
    font-size: 1rem;
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

      ${DateInput} {
        font-size: 85%;
      }
    }

    ${BorderlessButton} {
      margin-top: 0.25rem;
      font-size: 1rem;
    }
  }

  .role-filter {
    margin-bottom: 2rem;
  }

  ${SubmitButton} {
    width: 60%;
    font-size: 1.25rem;
    height: 3rem;
  }

  @media (max-width: 1300px) {
    margin-top: 0;
    ${InputWithIcon} {
      max-width: 12rem;

      input {
        font-size: 0.8rem;
      }
    }

    .registration-date-filter {
      .registration-date-input {
        ${DateInput} {
          padding: 0.25rem 0.1rem;
          font-size: 0.58rem;
        }
      }
    }

    ${SubmitButton} {
      width: 80%;
    }
  }
`;

export default StyledUserFilters;