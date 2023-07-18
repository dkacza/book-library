import styled from 'styled-components';
import Logo from 'components/molecules/Logo';

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

  img {
    overflow: hidden;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
`;

export default Wrapper;
