import React from 'react';
import styled from 'styled-components';
import SquareTileButton from 'components/atoms/SquareTileButton';
import { ReactComponent as EditIcon } from 'assets/icons/edit_FILL0_wght600_GRAD0_opsz48.svg';

const StyledUserDataLine = styled.div`
  display: flex;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary2};

  p:nth-child(1) {
    width: 32rem;
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
  }
  p:nth-child(2) {
    width: 24rem;
  }
  ${SquareTileButton} {
    height: 2rem;
    width: 2rem;
    svg {
      height: 1.5rem;
    }
  }
`;

const UserDataLine = ({ value, label, updateSelected, ...props }) => {
  return (
    <StyledUserDataLine className={props.className}>
      <p className="label">{label}</p>

      <p className="value">{value}</p>
      {updateSelected ? <SquareTileButton Icon={EditIcon} /> : ''}
    </StyledUserDataLine>
  );
};

export default styled(UserDataLine)``;
