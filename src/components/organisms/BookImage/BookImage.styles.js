import styled from 'styled-components';

const StyledBookImage = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 280px;

  input::file-selector-button {
    font-size: 1.25rem;
    background: none;
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary3};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary3};
    border-radius: 0.3rem;
    color: ${({ theme }) => theme.colors.secondary2};
    font-family: 'Roboto Slab', serif;
    
    &:hover {
      cursor: pointer;
    }
    
    margin-top: 2rem;
  }
`;

export default StyledBookImage;