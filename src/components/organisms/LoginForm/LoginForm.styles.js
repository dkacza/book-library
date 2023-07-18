import styled from 'styled-components';
import ButtonWithIcon from 'components/molecules/ButtonWithIcon/ButtonWithIcon';

export const PositionedButtonWithIcon = styled(ButtonWithIcon)`
  margin-bottom: 2.5rem;
`
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  ${PositionedButtonWithIcon}:nth-child(2) {
    margin-bottom: 1rem;
  }
  
`;