import styled from 'styled-components';
import InputWithIcon from 'components/molecules/InputWithIcon/InputWithIcon';
import { ReactComponent as UserIcon } from 'assets/icons/account_circle_FILL0_wght600_GRAD0_opsz48.svg';
import { ReactComponent as BookIcon } from 'assets/icons/book_FILL0_wght600_GRAD0_opsz48.svg';
import BorderlessButton from 'components/atoms/BorderlessButton';
import LabeledCheckbox from 'components/molecules/LabeledCheckbox';
import SubmitButton from 'components/atoms/SubmitButton';
import StyledHistoryFilters from 'components/organisms/HistoryFilters/HistoryFilters.styles';
import DateInput from 'components/atoms/DateInput';

const HistoryFilters = ({ onSubmit, register, authorizedHistoryView, ...props }) => {
  return (
    <StyledHistoryFilters onSubmit={onSubmit}>
      <InputWithIcon
        Icon={BookIcon}
        placeholder="search by book"
        name="book-search"
        id="book-search"
        type="text"
        {...register('bookSearchQuery')}
      />
      {authorizedHistoryView ? (
        <InputWithIcon
          Icon={UserIcon}
          placeholder="search by user"
          name="user-search"
          id="user-search"
          type="text"
          {...register('userSearchQuery')}
        />
      ) : (
        ''
      )}
      <div className="date-filters">
        <div className="starting-date-filter date-filter">
          <p className="label">Starting date between: </p>
          <div className="starting-date-input">
            <DateInput type="date" {...register('startDateFrom')} />
            <p>-</p>
            <DateInput {...register('startDateTo')} />
          </div>
          <BorderlessButton>clear</BorderlessButton>
        </div>

        <div className="return-date-filter date-filter">
          <p className="label">Return date between: </p>
          <div className="starting-date-input">
            <DateInput type="date" {...register('returnDateFrom')} />
            <p>-</p>
            <DateInput {...register('returnDateTo')} />
          </div>
          <BorderlessButton>clear</BorderlessButton>
        </div>
      </div>

      <div className="status-filter">
        <p className="label">Status: </p>
        <LabeledCheckbox label="Active" id="active" name="active" {...register('status.active')} />
        <LabeledCheckbox label="Returned" id="returned" name="returned" {...register('status.returned')} />
        <LabeledCheckbox label="Lost" id="lost" name="lost" {...register('status.lost')} />
      </div>

      <SubmitButton type="submit">Apply filters</SubmitButton>
    </StyledHistoryFilters>
  );
};

export default styled(HistoryFilters)``;
