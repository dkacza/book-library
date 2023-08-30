import BorderlessButton from 'components/atoms/BorderlessButton';
import React from 'react';
import styled from 'styled-components';

const UserDetailsRole = ({user, auth, handlePromotion, ...props}) => {
  return (
    <div className={props.className}>
      <div className="current-role">
        <p className="label">Current role</p>
        <p className="data">{user?.role}</p>
      </div>
      {auth?.role === 'admin' ? (
        <div className="promotion">
          <p className="role-label">Change user role</p>
          {user?.role !== 'librarian' && user?.role !== 'admin' ? (
            <BorderlessButton onClick={() => handlePromotion('librarian')}>
              Promote to librarian
            </BorderlessButton>
          ) : (
            ''
          )}
          {user?.role !== 'admin' ? (
            <BorderlessButton onClick={() => handlePromotion('admin')}>
              Promote to admin
            </BorderlessButton>
          ) : (
            ''
          )}
          {user?.role !== 'user' ? (
            <BorderlessButton className="demote" onClick={() => handlePromotion('user')}>
              Demote to regular user
            </BorderlessButton>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default styled(UserDetailsRole)``;
