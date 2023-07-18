import styled from 'styled-components';
import ButtonWithIcon from 'components/molecules/ButtonWithIcon/ButtonWithIcon';
import { Link } from 'react-router-dom';
import SubmitButton from 'components/atoms/SubmitButton';

export const PositionedButtonWithIcon = styled(ButtonWithIcon)`
  margin-bottom: 2.5rem;
`
export const PositionedSubmitButton = styled(SubmitButton)`
  margin: 3rem 0;
`
export const StyledLink = styled(Link)`
  font-family: "Roboto Slab", monospace;
  color: ${({theme}) => theme.colors.accept3};
  font-size: 1rem;
  letter-spacing: 0.04rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  
  ${PositionedButtonWithIcon}:nth-child(2) {
    margin-bottom: 1rem;
  }
  
`;