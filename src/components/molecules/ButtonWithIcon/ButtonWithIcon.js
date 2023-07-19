import React, { useState } from 'react';
import { ButtonWrapper } from 'components/molecules/ButtonWithIcon/ButtonWithIcon.styles';
import ToggleVisibilityButton from 'components/atoms/ToggleVisibilityButton';

const ButtonWithIcon = ({ name, id, type, Icon, ...props }) => {
  const initialVisibility = !(id === 'password');
  const [visible, setVisible] = useState(initialVisibility);
  const toggleVisibility = (e) => {
    e.preventDefault();
    const newVisibleState = !visible;
    setVisible(newVisibleState);
  };

  return (
    <ButtonWrapper {...props}>
      <div className="iconWrapper">
        <Icon />
      </div>
      <label htmlFor={id}></label>
      <input type={visible ? 'text' : 'password'} id={id} name={name} placeholder={name === 'email' ? 'email' : 'password'} required />
      {id === 'password' ? <ToggleVisibilityButton className="iconWrapper" onClick={toggleVisibility} visible={visible} /> : ''}
    </ButtonWrapper>
  );
};
export default ButtonWithIcon;
