import BorderlessButton from 'components/atoms/BorderlessButton';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import StyledLink from 'components/atoms/StyledLink';

const StyledBookDetailsLinkContainer = styled.div`
  .discard {
    color: ${({theme}) => theme.colors.secondary1};
  }

  * {
    margin-right: 1rem;
  }
`;
const checkEditingAuthorization = role => role === 'admin' || role === 'librarian';

const BookDetailsLinkContainer = ({
  auth,
  updateSelected,
  setUpdateSelected,
  handleSelectUpdate,
  handleDiscard,
  handleSave,
  ...props
}) => {
  const [authorizedToEdit, setAuthorizedToEdit] = useState(checkEditingAuthorization(auth.role));
  useEffect(() => {
    setAuthorizedToEdit(checkEditingAuthorization(auth.role));
  }, [auth]);

  return (
    <StyledBookDetailsLinkContainer className={props.className}>
      {authorizedToEdit && !updateSelected ? (
        <BorderlessButton onClick={e => handleSelectUpdate(e)}>
          Update book details
        </BorderlessButton>
      ) : (
        ''
      )}
      {!updateSelected ? (
        <StyledLink className="discard" to={'/books'}>
          Back to the catalogue
        </StyledLink>
      ) : (
        ''
      )}
      {updateSelected ? <BorderlessButton onClick={e => handleSave(e)}>Save</BorderlessButton> : ''}
      {updateSelected ? (
        <BorderlessButton className="discard" onClick={handleDiscard}>
          Discard
        </BorderlessButton>
      ) : (
        ''
      )}
    </StyledBookDetailsLinkContainer>
  );
};
export default styled(BookDetailsLinkContainer)``;
