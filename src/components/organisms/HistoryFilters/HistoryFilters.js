import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as UserIcon } from 'assets/icons/account_circle_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as BookIcon } from 'assets/icons/book_FILL0_wght600_GRAD0_opsz48.svg';
import BorderlessButton from 'components/atoms/BorderlessButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledHistoryFilters from 'components/organisms/HistoryFilters/HistoryFilters.styles';
import OutlinedInput from 'components/atoms/OutlinedInput';
import isEmptyObject from 'utils/isEmptyObject';
import React from 'react';

const HistoryFilters = ({ onSubmit, register, authorizedHistoryView, handleClearFields, errors, ...props }) => {
  return (
    <StyledHistoryFilters className={props.className} onSubmit={onSubmit}>
      <InputWithIcon
        id="book-search"
        name="book-search"
        placeholder="search by book"
        type="text"
        Icon={BookIcon}
        {...register('bookSearchQuery')}
      />
      {authorizedHistoryView ? (
        <InputWithIcon
          id="user-search"
          name="user-search"
          placeholder="search by user"
          type="text"
          Icon={UserIcon}
          {...register('userSearchQuery')}
        />
      ) : (
        ''
      )}
      <div className="date-filters">
        <div className="starting-date-filter date-filter">
          <p className="label">Starting date between:</p>
          <div className="starting-date-input">
            <OutlinedInput
              type="date"
              {...register('startDateFrom', {
                validate: (val, formValues) => val <= formValues.startDateTo || !formValues.startDateFrom,
              })}
              className={errors?.startDateFrom ? 'error' : ''}
            />
            <p>-</p>
            <OutlinedInput
              type="date"
              {...register('startDateTo', {
                validate: (val, formValues) => val >= formValues.startDateFrom || !formValues.startDateTo,
              })}
              className={errors?.startDateTo ? 'error' : ''}
            />
          </div>
          <BorderlessButton onClick={() => handleClearFields(['startDateFrom', 'startDateTo'])}>clear</BorderlessButton>
        </div>

        <div className="return-date-filter date-filter">
          <p className="label">Return date between: </p>
          <div className="starting-date-input">
            <OutlinedInput
              type="date"
              {...register('returnDateFrom', {
                validate: (val, formValues) => val <= formValues.returnDateTo || !formValues.returnDateFrom,
              })}
              className={errors?.returnDateFrom ? 'error' : ''}
            />
            <p>-</p>
            <OutlinedInput
              type="date"
              {...register('returnDateTo', {
                validate: (val, formValues) => val >= formValues.returnDateFrom || !formValues.returnDateTo,
              })}
              className={errors?.returnDateTo ? 'error' : ''}
            />
          </div>
          <BorderlessButton onClick={() => handleClearFields(['returnDateFrom', 'returnDateTo'])}>
            clear
          </BorderlessButton>
        </div>
      </div>

      <div className="status-filter">
        <p className="label">Status: </p>
        <LabeledCheckbox label="Active" id="active" name="active" {...register('status.active')} />
        <LabeledCheckbox label="Returned" id="returned" name="returned" {...register('status.returned')} />
        <LabeledCheckbox label="Lost" id="lost" name="lost" {...register('status.lost')} />
      </div>
      {!isEmptyObject(errors) ? <p className="error-msg">Please fill the filter form correctly</p> : ''}
      <SubmitButton type="submit">Apply filters</SubmitButton>
    </StyledHistoryFilters>
  );
};

export default styled(HistoryFilters)``;
