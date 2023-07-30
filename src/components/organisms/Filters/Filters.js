import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import { ReactComponent as MyIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';

const Filters = ({ register, onSubmit, formState }) => {
  return (
    <form className="filter-wrapper" onSubmit={onSubmit}>
      <InputWithIcon name="search" id="search" type="text" Icon={MyIcon} {...register('searchQuery')}/>
      <div className="release-year-filter">
        <p>Release year:</p>
        <input type="number" id="date-from-input" placeholder="from" {...register('yearFrom', {validate: (val, formValues) => val <= formValues.yearTo || 'Ending date must be greater or equal to starting date'})} />
        <p>-</p>
        <input type="number" id="date-to-input" placeholder="to" {...register('yearTo')} />
      </div>
      <div className="genre-filter">
        <p>Genre:</p>
        <LabeledCheckbox id="fiction" label="Fiction literature" name="fiction" {...register('fiction')} />
        <LabeledCheckbox id="non-fiction" label="Non-fiction literature" name="non-fiction" {...register('nonFiction')}  />
        <LabeledCheckbox id="science" label="Scientific literature" name="scientific" {...register('scientific')} />
        <LabeledCheckbox id="children" label="Children literature" name="children" {...register('children')} />
        <LabeledCheckbox id="poetry" label="Poetry and drama" name="poetry" {...register('poetry')} />
      </div>
      <div className="availability-filter">
        <p>Availability:</p>
        <LabeledCheckbox id="available" label="Display only available books" name="available" {...register('availableOnly')}/>
      </div>
      <SubmitButton type="submit">Apply filters</SubmitButton>
    </form>
  );
};
export default Filters;
