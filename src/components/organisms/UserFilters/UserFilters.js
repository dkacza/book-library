import React from 'react';
import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import {ReactComponent as UserIcon} from 'assets/icons/account_circle_FILL0_wght600_GRAD0_opsz48.svg';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';
import BorderlessButton from 'components/atoms/BorderlessButton';
import StyledUserFilters from 'components/organisms/UserFilters/UserFilter.styles';
import OutlinedInput from 'components/atoms/OutlinedInput';
import isEmptyObject from 'utils/isEmptyObject';

const UserFilters = ({onSubmit, register, errors, handleClearFields, ...props}) => {
  return (
    <StyledUserFilters onSubmit={onSubmit} className={props.className}>
      <InputWithIcon
        Icon={UserIcon}
        placeholder={'search'}
        name="user-search"
        id="user-search"
        type="text"
        {...register('userSearchQuery')}
      />
      <div className="registration-date-filter">
        <p className="label">Registration date between:</p>
        <div className="registration-date-input">
          <OutlinedInput
            type="date"
            {...register('registrationDateFrom', {
              validate: (val, formValues) =>
                val <= formValues.registrationDateTo || !formValues.registrationDateTo,
            })}
            className={errors?.registrationDateFrom ? 'error' : ''}
          />
          <p>-</p>
          <OutlinedInput
            type="date"
            {...register('registrationDateTo', {
              validate: (val, formValues) =>
                val >= formValues.registrationDateFrom || !formValues.registrationDateFrom,
            })}
            className={errors?.registrationDateTo ? 'error' : ''}
          />
        </div>
        <BorderlessButton
          onClick={() => handleClearFields(['registrationDateFrom', 'registrationDateTo'])}
        >
          clear
        </BorderlessButton>
      </div>
      <div className="role-filter">
        <p className="label">Role:</p>
        <LabeledCheckbox
          label={'Regular user'}
          id={'user'}
          name={'user'}
          {...register('role.user')}
        />
        <LabeledCheckbox
          label={'Librarian'}
          id={'librarian'}
          name={'librarian'}
          {...register('role.librarian')}
        />
        <LabeledCheckbox label={'Admin'} id={'admin'} name={'admin'} {...register('role.admin')} />
      </div>
      {!isEmptyObject(errors) ? (
        <p className="error-msg">Please fill the filter form correctly</p>
      ) : (
        ''
      )}
      <SubmitButton type="submit">Apply filters</SubmitButton>
    </StyledUserFilters>
  );
};

export default styled(UserFilters)``;
