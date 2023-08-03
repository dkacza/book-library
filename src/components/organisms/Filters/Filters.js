import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import { ReactComponent as MyIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledFilters from 'components/organisms/Filters/Filters.styles';
import NumberInput from 'components/atoms/NumberInput';
import styled from 'styled-components';

const Filters = ({ register, onSubmit, ...props }) => {
  return (
    <StyledFilters className={props.className} onSubmit={onSubmit}>
      <InputWithIcon
        placeholder="search"
        name="search"
        id="search"
        type="text"
        Icon={MyIcon}
        {...register('searchQuery')}
      />
      <div className="release-year-filter">
        <p>Release year:</p>
        <div className="release-year-input">
          <NumberInput
            type="number"
            id="date-from-input"
            placeholder="from"
            {...register('yearFrom', {
              validate: (val, formValues) =>
                val <= formValues.yearTo || 'Ending date must be greater or equal to starting date',
            })}
          />
          <p>-</p>
          <NumberInput id="date-to-input" name="date-to" placeholder="to" {...register('yearTo')} />
        </div>
      </div>
      <div className="genre-filter">
        <p>Genre:</p>
        <LabeledCheckbox id="fiction" label="Fiction literature" name="fiction" {...register('genre.fiction')} />
        <LabeledCheckbox
          id="non-fiction"
          label="Non-fiction literature"
          name="non-fiction"
          {...register('genre.nonFiction')}
        />
        <LabeledCheckbox
          id="science"
          label="Scientific literature"
          name="scientific"
          {...register('genre.scientific')}
        />
        <LabeledCheckbox id="children" label="Children literature" name="children" {...register('genre.children')} />
        <LabeledCheckbox id="poetry" label="Poetry and drama" name="poetry" {...register('genre.poetry')} />
      </div>
      <div className="availability-filter">
        <p>Availability:</p>
        <LabeledCheckbox
          id="available"
          label="Display only available books"
          name="available"
          {...register('availableOnly')}
        />
      </div>
      <SubmitButton type="submit">Apply filters</SubmitButton>
    </StyledFilters>
  );
};
export default styled(Filters)``;
