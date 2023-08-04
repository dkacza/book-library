import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as SearchIcon } from 'assets/icons/search_FILL0_wght600_GRAD0_opsz48.svg';
import BorderlessButton from 'components/atoms/BorderlessButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';

const HistoryFilters = ({ onSubmit, register, ...props }) => {
  return (
    <form onSubmit={onSubmit}>
      <InputWithIcon
        Icon={SearchIcon}
        placeholder='search'
        name='search'
        id='search'
        type='text'
        {...register('searchQuery')}
      />
      <div className='date-filters'>
        <div className='starting-date-filter'>
          <p className='label'>Starting date between: </p>
          <div className='starting-date-input'>
            <input type='date' {...register('startDateFrom')} />
            <p>-</p>
            <input type='date' {...register('startDateTo')} />
          </div>
          <BorderlessButton>clear</BorderlessButton>
        </div>

        <div className='return-date-filter'>
          <p className='label'>Return date between: </p>
          <div className='starting-date-input'>
            <input type='date' {...register('returnDateFrom')} />
            <p>-</p>
            <input type='date' {...register('returnDateTo')} />
          </div>
          <BorderlessButton>clear</BorderlessButton>
        </div>
      </div>

      <div className='status-filter'>
        <p className='label'>Status: </p>
        <LabeledCheckbox label='Active' id='active' name='active' {...register('status.active')} />
        <LabeledCheckbox label='Returned' id='returned' name='returned' {...register('status.returned')} />
        <LabeledCheckbox label='Lost' id='lost' name='lost' {...register('status.lost')} />
      </div>

      <SubmitButton type="submit">Apply filters</SubmitButton>
    </form>
  );
};

export default styled(HistoryFilters)``;
