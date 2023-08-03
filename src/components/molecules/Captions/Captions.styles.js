import styled from 'styled-components';

const StyledCaptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  button {
    background: ${({ theme }) => theme.colors.primary1};
    border: 6px solid ${({ theme }) => theme.colors.primary3};
    border-bottom: none;
    border-radius: 0.5rem 0.5rem 0 0;
    position: relative;
    width: 8rem;
    height: 2.5rem;
    font-size: 1.25rem;
  }

  button:nth-child(1) {
    font-weight: bold;
    height: 3rem;
    margin-right: 0.25rem;
    transform: translateY(6px);
  }

  button:nth-child(2) {
    &:hover {
      cursor: pointer;
    }

    height: 2.25rem;
  }
`;

export default StyledCaptions;