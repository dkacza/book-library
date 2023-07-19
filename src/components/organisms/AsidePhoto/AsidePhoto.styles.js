import styled from 'styled-components';
import Logo from 'components/molecules/Logo/Logo';
import img from 'assets/images/aside-photo.jpg';

export const PositionedLogo = styled(Logo)`
  margin-left: 4rem;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.primary1};
`;

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  img {
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
