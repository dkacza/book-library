import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import { ReactComponent as MyIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';

const Filters = () => {
  return (
    <div className="filter-wrapper">
      <InputWithIcon name="search" id="search" type="text" Icon={MyIcon}/>
      <div className="release-year-filter">
        <p>Release year:</p>
        <input type="text" placeholder="from" />
        <p>-</p>
        <input type="text" placeholder="to" />
      </div>
      <div className="genre-filter">
        <p>Genre:</p>
        <LabeledCheckbox id="fiction" label="Fiction literature" name="fiction" />
        <LabeledCheckbox id="non-fiction" label="Non-fiction literature" name="non-fiction" />
        <LabeledCheckbox id="science" label="Scientific literature" name="scientific" />
        <LabeledCheckbox id="children" label="Children literature" name="children" />
        <LabeledCheckbox id="poetry" label="Poetry and drama" name="poetry" />
      </div>
      <div className="availability-filter">
        <p>Availability:</p>
        <LabeledCheckbox id="available" label="Display only available books" name="available" />
      </div>
      <SubmitButton>Apply filters</SubmitButton>
    </div>
  );
};
export default Filters;
