import styled from 'styled-components';
import Logo from 'components/molecules/Logo/Logo';
import img from 'assets/images/aside-photo.jpg';


const StyledAsidePhoto = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${Logo} {
    color: ${({theme}) => theme.colors.primary1};
    margin-left: 4rem;
    margin-bottom: 4rem;
  }
`;

export default StyledAsidePhoto;
