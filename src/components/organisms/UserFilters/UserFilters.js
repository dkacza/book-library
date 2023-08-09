import React from 'react';
import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as UserIcon } from 'assets/icons/account_circle_FILL0_wght600_GRAD0_opsz48.svg';
import DateInput from 'components/atoms/DateInput';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';

const UserFilters = ({ onSubmit, register, ...props }) => {
  return (
    <form onSubmit={onSubmit} className={props.className}>
      <InputWithIcon
        Icon={UserIcon}
        placeholder={'search by user'}
        name="user-search"
        id="user-search"
        type="text"
        {...register('userSearchQuery')}
      />
      <div className="registration-date-filter">
        <p className="label">Registration date between:</p>
        <div className="registration-date-input">
          <DateInput type="date" {...register('registrationDateFrom')} />
          <p>-</p>
          <DateInput type="date" {...register('registrationDateTo')} />
        </div>
      </div>
      <div className="role-filter">
        <p className="label">Role:</p>
        <LabeledCheckbox label={'Regular user'} id={'user'} name={'user'} {...register('role.user')} />
        <LabeledCheckbox label={'Librarian'} id={'librarian'} name={'librarian'} {...register('role.librarian')} />
        <LabeledCheckbox label={'Admin'} id={'admin'} name={'admin'} {...register('role.admin')} />
      </div>

      <SubmitButton type="submit">Apply filters</SubmitButton>
    </form>
  );
};

export default styled(UserFilters)``;
