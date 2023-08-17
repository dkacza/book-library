import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledBookFilters from 'components/organisms/BookFilters/BookFilters.styles';
import OutlinedInput from 'components/atoms/OutlinedInput';
import styled from 'styled-components';
import isEmptyObject from 'utils/isEmptyObject';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';

const BookFilters = ({ register, onSubmit, errors, ...props }) => {
  return (
    <StyledBookFilters className={props.className} onSubmit={onSubmit}>
      <InputWithIcon
        id="search"
        name="search"
        placeholder="search"
        type="text"
        Icon={SearchIcon}
        {...register('searchQuery')}
      />
      <div className="release-year-filter">
        <p className="label">Release year:</p>
        <div className="release-year-input">
          <OutlinedInput
            id="date-from-input"
            placeholder="from"
            type="number"
            {...register('yearFrom', {
              validate: (val, formValues) => val <= formValues.yearTo,
            })}
            className={errors?.yearFrom ? 'error' : ''}
          />
          <p>-</p>
          <OutlinedInput
            id="date-to-input"
            name="date-to"
            placeholder="to"
            {...register('yearTo', {
              validate: (val, formValues) => val >= formValues.yearFrom,
            })}
            className={errors?.yearTo ? 'error' : ''}
          />
        </div>
      </div>
      <div className="genre-filter">
        <p className="label">Genre:</p>
        <LabeledCheckbox id="fiction" label="Fiction literature" name="fiction" {...register('genre.fiction')} />
        <LabeledCheckbox
          id="non-fiction"
          name="non-fiction"
          label="Non-fiction literature"
          {...register('genre.nonFiction')}
        />
        <LabeledCheckbox
          id="scienctific"
          name="scientific"
          label="Scientific literature"
          {...register('genre.scientific')}
        />
        <LabeledCheckbox id="children" label="Children literature" name="children" {...register('genre.children')} />
        <LabeledCheckbox id="poetry" label="Poetry and drama" name="poetry" {...register('genre.poetry')} />
      </div>
      <div className="availability-filter">
        <p className="label">Availability:</p>
        <LabeledCheckbox
          id="available"
          name="available"
          label="Display only available books"
          {...register('availableOnly')}
        />
      </div>
      {!isEmptyObject(errors) ? <p className="error-msg">Please fill the filter form correctly</p> : ''}
      <SubmitButton type="submit">Apply filters</SubmitButton>
    </StyledBookFilters>
  );
};
export default styled(BookFilters)``;
