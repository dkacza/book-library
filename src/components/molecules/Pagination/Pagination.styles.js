import styled from 'styled-components';
import SquareTileButton from 'components/atoms/SquareTileButton';

const StyledPagination = styled.div`
  p.page-info {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.secondary2};
    margin-bottom: 0.5rem;
  }

  div.page-control-buttons {
    display: flex;
    flex-direction: row;

    ${SquareTileButton} {
      margin-right: 0.5rem;
    }
  }

`;

export default StyledPagination;