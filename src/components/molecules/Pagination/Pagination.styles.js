import styled from 'styled-components';

const Wrapper = styled.div`
  p {
    font-family: 'Roboto Slab', monospace;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.secondary2};
    margin-bottom: 0.5rem;
  }

  div.page-control-buttons {
    display: flex;
    flex-direction: row;

    button {
      margin-right: 0.4rem;
    }
  }

`;

export default Wrapper;