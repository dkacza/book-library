import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';
import OutlinedInput from 'components/atoms/OutlinedInput';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox';

const StyledBookFilters = styled.form`
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

  .release-year-filter {
    margin-bottom: 1rem;

    .release-year-input {
      margin-top: 0.25rem;
      display: flex;
      flex-direction: row;
      height: 2rem;
      font-size: 1.5rem;
    }
  }

  .genre-filter, .availability-filter {
    margin-bottom: 1rem;
  }

  p.error-msg {
    color: ${({ theme }) => theme.colors.error2};
    font-weight: bold;
    font-size: 1.25rem;
  }

  ${OutlinedInput} {
    max-width: 8rem;
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
        font-size: 1rem;
      }
    }

    ${OutlinedInput} {
      max-width: 6rem;
    }
    
  }
}
`;

export default StyledBookFilters;