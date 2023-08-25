import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import Table from 'components/organisms/Table/Table';

const StyledUserSelection = styled.div`
  ${InputWithIcon} {
    max-width: 36rem;
  }
  ${Table} {
    width: 65%;
    height: 500px;
  }
  .tip {
    margin-top: 0.25rem;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: ${({theme}) => theme.colors.secondary1};
  }
`;

export default StyledUserSelection;