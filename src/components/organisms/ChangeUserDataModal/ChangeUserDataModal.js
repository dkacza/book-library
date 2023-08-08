import React from 'react';
import StyledChangeUserDataModal from 'components/organisms/ChangeUserDataModal/ChangeUserDataModal.styles';
import styled from 'styled-components';
import Overlay from 'components/atoms/Overlay';
import RegisterForm from 'components/organisms/RegisterForm/RegisterForm';
import Title from 'components/atoms/Title';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

const ChangeUserDataModal = () => {
  return (
    <Overlay>
      <StyledChangeUserDataModal>
        <Title>Change personal data</Title>
        <InputWithIcon></InputWithIcon>
      </StyledChangeUserDataModal>
    </Overlay>
  );
}

export default styled(ChangeUserDataModal)``;