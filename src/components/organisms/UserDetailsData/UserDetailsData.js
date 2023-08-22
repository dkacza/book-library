import React from 'react';
import styled from 'styled-components';

const UserDetailsData = ({ user }) => {
  return (<>
    <div className='first-name'>
      <p className='label'>First name</p>
      <p className='data'>{user.firstName}</p>
    </div>
    <div className='last-name'>
      <p className='label'>Last name</p>
      <p className='data'>{user.lastName}</p>
    </div>
    <div className='email'>
      <p className='label'>Email address</p>
      <p className='data'>{user.email}</p>
    </div>
    <div className='phone'>
      <p className='label'>Phone number</p>
      <p className='data'>{user.phoneNumber}</p>
    </div>
    <div className='registration-date'>
      <p className='label'>Registration date</p>
      <p className='data'>{user.registrationDate}</p>
    </div>
    <div className='eligibility'>
      <p className='label'>Eligibility</p>
      <p className='data'>{user.eligible ? 'Yes' : 'No'}</p>
    </div>
  </>);
};

export default styled(UserDetailsData)``;