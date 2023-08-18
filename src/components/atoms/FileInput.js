import React from 'react';
import styled from 'styled-components';

const StyledFileInput = styled.div`
  input {
    font-size: 0;
  }

  input::file-selector-button {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    border: 0.15rem solid ${({ theme }) => theme.colors.primary3};
    border-bottom: 0.20rem solid ${({ theme }) => theme.colors.primary3};
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;
    background: ${({ theme }) => theme.colors.primary2};
    color: ${({ theme }) => theme.colors.secondary2};
    font-family: 'Roboto Slab', serif;
    cursor: pointer;
  }

  p.selected-info {
    font-size: 1rem;
    font-style: italic;
  }
`

const FileInput = ({handleImageSelection, file, ...props}) => {
  return (
    <StyledFileInput className={props.className}>
      <input type="file" onChange={(e) => handleImageSelection(e)} />
      <p className="selected-info">{file ? file.name : 'Default photo will be applied'}</p>
    </StyledFileInput>
  );
};
export default styled(FileInput)``;
