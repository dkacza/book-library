import React from 'react';
import styled from 'styled-components';

const StyledUserDataLine = styled.div`
  display: flex;
  font-size: 2rem;
  color: ${({theme}) => theme.colors.secondary2};
  p:nth-child(1) {
    width: 32rem;
    font-weight: bold;
    font-family: 'Raleway', sans-serif;
  }
`;

const UserDataLine = ({ value, label, ...props }) => {
  return (
    <StyledUserDataLine className={props.className}>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </StyledUserDataLine>
  );
};

export default styled(UserDataLine)``;
