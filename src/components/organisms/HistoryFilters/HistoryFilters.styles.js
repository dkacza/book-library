import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import DateInput from 'components/atoms/DateInput';
import BorderlessButton from 'components/atoms/BorderlessButton';
import SubmitButton from 'components/atoms/SubmitButton';

const StyledHistoryFilters = styled.form`
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

  .date-filters {
    .date-filter {
      margin-bottom: 1rem;
    }

    .label {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.secondary2};
    }

    .date-filter > div {
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

  .status-filter {
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

    .date-filters {
      .date-filter > div {
        ${DateInput} {
          padding: 0.25rem 0.1rem;
          font-size: 0.58rem;
        }
      }

      ${BorderlessButton} {
        margin-top: 0.25rem;
        font-size: 1rem;
      }
    }

    ${SubmitButton} {
      width: 80%;
    }
  }
`;

export default StyledHistoryFilters;