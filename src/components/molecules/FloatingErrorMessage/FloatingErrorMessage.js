import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'assets/icons/close_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/error_FILL0_wght600_GRAD0_opsz48.svg';

const StyledFloatingErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error1};
  color: ${({ theme }) => theme.colors.primary1};
  padding: 1rem;
  position: relative;
  border-radius: 0.25rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  transition: 0.2s;
  
  
  &.hidden {
    width: 4rem;
    height: 4rem;
    p.error-title, p.error-msg, button.close-modal {
      display: none;
    }
  }
  &.active {
    width: 320px;
    height: min-content;
    button.open-modal {
      display: none;
    }
  }

  p.error-title {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary1};
    cursor: pointer;

    svg {
      height: 2rem;
      width: 2rem;
    }
  }

  button.close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;
const FloatingErrorMessage = ({ error, ...props }) => {
  const [active, setActive] = useState(true);
  return (
    <StyledFloatingErrorMessage className={`${props.className} ${active ? 'active' : 'hidden'}`}>
      <p className='error-title'>Service Error</p>
      <p className='error-msg'>{error}</p>
      <button className='close-modal' onClick={() => setActive(false)}>
        <CloseIcon></CloseIcon>
      </button>
      <button className="open-modal" onClick={() => setActive(true)}>
        <ErrorIcon></ErrorIcon>
      </button>
    </StyledFloatingErrorMessage>
  );
};
export default styled(FloatingErrorMessage)``;
