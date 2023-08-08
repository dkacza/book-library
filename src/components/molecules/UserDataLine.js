import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SquareTileButton from 'components/atoms/SquareTileButton';
import { ReactComponent as EditIcon } from 'assets/icons/edit_FILL0_wght600_GRAD0_opsz48.svg';
import SimpleInput from 'components/atoms/SimpleInput';

const StyledUserDataLine = styled.div`
  display: flex;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary2};

  p:nth-child(1) {
    width: 32rem;
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
  }

  :nth-child(2) {
    width: 24rem;
  }

  ${SquareTileButton} {
    height: 2rem;
    width: 2rem;

    svg {
      height: 1.5rem;
    }
  }
  ${SimpleInput} {
    font-size: 2rem;
  }
`;

const UserDataLine = ({ value, label, updateSelected, register, placeholder, canBeUpdated, ...props }) => {
  const [activeInput, setActiveInput] = useState(false)

  const handleInputActivation = () => {
    if (updateSelected) {
      setActiveInput(true)
    }
  }
  useEffect(() => {
    setActiveInput(false);
  }, [updateSelected])

  return (
    <StyledUserDataLine className={props.className}>
      <p className="label">{label}</p>
      {activeInput && updateSelected? <SimpleInput placeholder={placeholder} /> : <p className="value">{value}</p>}

      {updateSelected && canBeUpdated && !activeInput ? <SquareTileButton Icon={EditIcon} onClick={handleInputActivation} /> : ''}
    </StyledUserDataLine>
  );
};

export default styled(UserDataLine)``;
