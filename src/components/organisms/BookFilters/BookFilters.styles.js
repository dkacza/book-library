import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';
import OutlinedInput from 'components/atoms/OutlinedInput';

const StyledBookFilters = styled.form`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;

  ${InputWithIcon} {
    height: 3.5rem;
    margin-bottom: 1rem;
    width: 80%;
  }

  .release-year-filter {
    font-size: 1.5rem;
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
    p {
      margin-bottom: 0.25rem;
    }

    margin-bottom: 1rem;
  }

  p.error-msg {
    color: ${({ theme }) => theme.colors.error2};
    font-weight: bold;
    font-size: 1.25rem;
  }

  ${SubmitButton} {
    margin-top: 2rem;
    width: 50%;
    height: 3rem;
    font-size: 1.25rem;
  }
  ${OutlinedInput} {
    max-width: 8rem;
  }

  @media (max-width: 1300px) {
    padding-left: 0.5rem;

    .release-year-filter {
      font-size: 1.2rem;
      margin-bottom: 1rem;

      .release-year-input {
        margin-top: 0.25rem;
        display: flex;
        flex-direction: row;
        height: 2rem;
        font-size: 1.5rem;

        
      }
    }

    ${SubmitButton} {
      width: 65%;
    }
  }
`;

export default StyledBookFilters;