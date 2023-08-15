import styled from 'styled-components';
import { StyledLink } from 'components/atoms/StyledLink';
import BorderlessButton from 'components/atoms/BorderlessButton';

const StyledContentSection = styled.section`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & > div {
    margin-bottom: 1rem;
  }

  .label {
    font-weight: bold;
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.secondary1};
  }

  .data {
    font-size: 1.5rem;
  }

  .role {
    margin-bottom: 2rem;
  }
  .promotion {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .role-label {
      font-weight: bold;
      font-size: 1.25rem;
      color: ${({ theme }) => theme.colors.secondary1};
    }
  }

  ${BorderlessButton} {
    font-size: 1rem;

    &.demote {
      color: ${({ theme }) => theme.colors.error2};
    }
  }

  ${StyledLink} {
    color: ${({ theme }) => theme.colors.secondary1};
    font-size: 1.25rem;

  }
  p.errorMsg {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.error2};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 1300px) {
    & > div {
      margin-bottom: 0.25rem;
    }

    .label {
      font-size: 1.25rem;
    }

    .data {
      font-size: 1rem;
    }
  }
`;

export default StyledContentSection;