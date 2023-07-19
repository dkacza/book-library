import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper';
export const StyledViewWrapper = styled(ViewWrapper)`
  display: flex;
  flex-direction: row;
  
  aside {
    flex-grow: 80;
  }
  main {
    flex-grow: 20;
    min-width: 500px;
  }
`;
