import styled from 'styled-components';
import UnderlinedInput from 'components/atoms/UnderlinedInput';
import SubmitButton from 'components/atoms/SubmitButton';
import BorderlessButton from 'components/atoms/BorderlessButton';

const StyledAddBookForm = styled.form`
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(5, 6rem) 1fr;
  grid-template-areas:
  "title photo-input"
  "authors photo-input"
  "publication-date description"
  "isbn ."
  "genre ."
  "submission-wrapper .";
  margin-top: 3rem;

  .title {
    grid-area: title;
  }

  .authors {
    grid-area: authors
  }

  .publication-date {
    grid-area: publication-date
  }

  .isbn {
    grid-area: isbn
  }

  .genre {
    grid-area: genre
  }

  .description {
    grid-area: description
  }

  .photo-input {
    grid-area: photo-input;

    ${BorderlessButton} {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.secondary1};
    }
  }

  .submission-wrapper {
    grid-area: submission-wrapper
  }

  ${SubmitButton} {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 40%;
  }

  .error-msg {
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.error2};
  }

  .label {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.secondary1};
    margin-bottom: 0.25rem;
  }

  ${UnderlinedInput} {
    font-size: 1.25rem;
    height: min-content;
  }

  .hint {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.secondary1};
  }

  select {
    background: none;
    border: 2px solid ${({ theme }) => theme.colors.primary3};
    color: ${({ theme }) => theme.colors.secondary2};
    border-radius: 0.25rem;
    height: 2rem;
    padding: 0 0.25rem;
    cursor: pointer;
    
    &:focus {
      border: 2px solid ${({ theme }) => theme.colors.primary3};
    }
  }
`;
export default StyledAddBookForm;