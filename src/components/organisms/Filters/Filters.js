import React from 'react';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';

import { ReactComponent as MyIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';

const Filters = ({ filters, dispatch, ACTION_TYPES, onSubmit }) => {
  const handleInputChange = (e, type) => {
    dispatch({
      type,
      newValue: e.target.value,
    });
  };

  return (
    <form className="filter-wrapper" onSubmit={onSubmit}>
      <InputWithIcon
        name="search"
        id="search"
        type="text"
        Icon={MyIcon}
        value={filters.searchQuery}
        onChange={(e) => handleInputChange(e, ACTION_TYPES.changeSearchQuery)}
      />
      <div className="release-year-filter">
        <p>Release year:</p>
        <input
          type="text"
          id="date-from-input"
          placeholder="from"
          value={filters.releaseYear.from || ''}
          onChange={(e) => handleInputChange(e, ACTION_TYPES.changeFromDate)}
        />
        <p>-</p>
        <input
          type="text"
          id="date-to-input"
          placeholder="to"
          value={filters.releaseYear.to || ''}
          onChange={(e) => handleInputChange(e, ACTION_TYPES.changeToDate)}
        />
      </div>
      <div className="genre-filter">
        <p>Genre:</p>
        <LabeledCheckbox
          id="fiction"
          label="Fiction literature"
          name="fiction"
          value={filters.genre.fiction}
          checked={filters.genre.fiction}
          onChange={() => dispatch({ type: ACTION_TYPES.toggleFiction })}
        />
        <LabeledCheckbox
          id="non-fiction"
          label="Non-fiction literature"
          name="non-fiction"
          value={filters.genre.nonFiction}
          checked={filters.genre.nonFiction}
          onChange={() => dispatch({ type: ACTION_TYPES.toggleNonFiction })}
        />
        <LabeledCheckbox
          id="science"
          label="Scientific literature"
          name="scientific"
          value={filters.genre.scientific}
          checked={filters.genre.scientific}
          onChange={() => dispatch({ type: ACTION_TYPES.toggleScientific })}
        />
        <LabeledCheckbox
          id="children"
          label="Children literature"
          name="children"
          value={filters.genre.children}
          checked={filters.genre.children}
          onChange={() => dispatch({ type: ACTION_TYPES.toggleChildren })}
        />
        <LabeledCheckbox
          id="poetry"
          label="Poetry and drama"
          name="poetry"
          value={filters.genre.poetry}
          checked={filters.genre.poetry}
          onChange={() => dispatch({ type: ACTION_TYPES.togglePoetry })}
        />
      </div>
      <div className="availability-filter">
        <p>Availability:</p>
        <LabeledCheckbox
          id="available"
          label="Display only available books"
          name="available"
          value={filters.availableOnly}
          checked={filters.availableOnly}
          onChange={() => dispatch({ type: ACTION_TYPES.toggleAvailability })}
        />
      </div>
      <SubmitButton type="submit">Apply filters</SubmitButton>
    </form>
  );
};
export default Filters;
