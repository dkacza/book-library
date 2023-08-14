import React from 'react';
import styled from 'styled-components';

const StyledFileInput = styled.div`
  input {
    font-size: 0;
  }

  .label {
    font-size: 1rem;
    margin-top: 0.3rem;
    padding-left: 0.5rem;
  }

  input::file-selector-button {
    font-size: 1.25rem;
    background: none;
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.primary3};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary3};
    border-radius: 0.3rem;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.secondary2};
    font-family: 'Roboto Slab', serif;

    &:hover {
      cursor: pointer;
    }
  }
`

const FileInput = ({handleImageSelection, file}) => {
  return (
    <StyledFileInput>
      <input type="file" onChange={(e) => handleImageSelection(e)} />
      <p className="selected-info">{file ? file.name : 'Default photo will be applied'}</p>
    </StyledFileInput>
  );
};
export default styled(FileInput)``;
