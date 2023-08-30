import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import BorderlessButton from 'components/atoms/BorderlessButton';
import SubmitButton from 'components/atoms/SubmitButton';
import OutlinedInput from 'components/atoms/OutlinedInput';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox';

const StyledHistoryFilters = styled.form`
  display: flex;
  flex-direction: column;

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
    font-size: 1.2rem;
    color: ${({theme}) => theme.colors.secondary2};
    margin-bottom: 0.2rem;
  }

  .date-filters {
    .date-filter {
      margin-bottom: 1rem;
    }

    .date-filter > div {
      display: flex;
      flex-direction: row;

      * {
        margin-right: 0.5rem;
      }
    }
  }

  p.error-msg {
    color: ${({theme}) => theme.colors.error2};
    font-weight: bold;
    font-size: 1.25rem;
  }

  ${OutlinedInput} {
    max-width: 8rem;
    font-size: 0.75rem;
  }

  ${BorderlessButton} {
    margin-top: 0.25rem;
    font-size: 1rem;
  }

  ${LabeledCheckbox} {
    margin-bottom: 0.2rem;
  }

  ${SubmitButton} {
    margin-top: 2rem;
    max-width: 12rem;
    font-size: 1.25rem;
  }

  @media (max-width: 1280px) {
    ${InputWithIcon} {
      max-width: 12rem;

      input {
        font-size: 0.8rem;
      }
    }

    .date-filters {
      .date-filter > div {
        ${OutlinedInput} {
          padding: 0.25rem 0.1rem;
          font-size: 0.58rem;
        }
      }

      ${BorderlessButton} {
        margin-top: 0.25rem;
        font-size: 1rem;
      }
    }
  }
`;

export default StyledHistoryFilters;
