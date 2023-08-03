import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import SubmitButton from 'components/atoms/SubmitButton';

const StyledResetPassword = styled.form`
  margin-top: 5rem;
  ${InputWithIcon} {
    height: 4rem;
    margin-bottom: 1.5rem;
  }
  ${SubmitButton} {
    width: 100%;
    margin: 2.5rem 0;
  }
`;
export default StyledResetPassword;