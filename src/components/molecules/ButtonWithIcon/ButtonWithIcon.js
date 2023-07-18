import React, { useState } from 'react';
import { ButtonWrapper } from 'components/molecules/ButtonWithIcon/ButtonWrapper.styles';
import ToggleVisibilityButton from 'components/atoms/ToggleVisibilityButton';

const ButtonWithIcon = ({ name, id, type, Icon }) => {
  const initialVisibility = !(id === "password")
  const [visible, setVisible] = useState(initialVisibility);
  const toggleVisibility = (e) => {
    e.preventDefault();
    const newVisibleState = !visible;
    setVisible(newVisibleState);
  }

  return (
    <ButtonWrapper>
      <Icon/>
      <label htmlFor={id}></label>
      <input type={visible ? "text" : "password"} name={name} placeholder={name === 'email' ? 'email' : 'password'}/>
      {id === "password" ? <ToggleVisibilityButton onClick={toggleVisibility} visible={visible}/> : ''}
    </ButtonWrapper>
  );
};
export default ButtonWithIcon;
