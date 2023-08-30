import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import Table from 'components/organisms/Table/Table';

const StyledUserSelection = styled.div`
  ${InputWithIcon} {
    max-width: 36rem;
  }
  ${Table} {
    width: 65%;
    height: 28rem;
    margin-bottom: 2rem;
  }
  .tip {
    margin-top: 0.25rem;
    margin-bottom: 2rem;
    color: ${({theme}) => theme.colors.secondary1};
  }

  @media (max-height: 800px) {
    ${InputWithIcon} {
      height: 2.5rem;
      max-width: 24rem;
      input {
        font-size: 1rem;
      }
    }
    ${Table} {
      height: 20rem;
      margin-bottom: 0;
    }
    .tip {
      max-width: 30rem;
    }
  }
`;

export default StyledUserSelection;
