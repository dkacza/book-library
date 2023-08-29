import styled from 'styled-components';

const TextArea = styled.textarea`
  background: none;
  border: 0.15rem solid ${({theme}) => theme.colors.primary3};
  padding: 0.25rem;
  font-size: 1rem;

  &:focus-visible {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
  }

  &::-webkit-scrollbar-track {
    opacity: 1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({theme}) => theme.colors.secondary1};
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({theme}) => theme.colors.secondary2};
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }
`;

export default TextArea;
