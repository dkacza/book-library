import React, { useState } from 'react';
import { InputWrapper } from 'components/molecules/InputWithIcon/InputWithIcon.styles';
import ToggleVisibilityButton from 'components/atoms/ToggleVisibilityButton';

const InputWithIcon = ({ name, id, type, Icon, ...props }) => {
  const initialVisibility = !(id === 'password');
  const [visible, setVisible] = useState(initialVisibility);
  const toggleVisibility = (e) => {
    e.preventDefault();
    const newVisibleState = !visible;
    setVisible(newVisibleState);
  };

  return (
    <InputWrapper {...props} className="icon-button">
      <div className="icon-wrapper">
        <Icon />
      </div>
      <label htmlFor={id}></label>
      <input type={visible ? 'text' : 'password'} id={id} name={name} placeholder={name} required />
      {id === 'password' ? <ToggleVisibilityButton className="icon-wrapper" onClick={toggleVisibility} visible={visible} /> : ''}
    </InputWrapper>
  );
};
export default InputWithIcon;
