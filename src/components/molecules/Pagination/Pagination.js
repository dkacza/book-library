import React from 'react';
import StyledPagination from 'components/molecules/Pagination/Pagination.styles';
import SquareTileButton from 'components/atoms/SquareTileButton';

import {ReactComponent as LeftIcon} from 'assets/icons/keyboard_arrow_left_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as DoubleLeftIcon} from 'assets/icons/keyboard_double_arrow_left_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as RightIcon} from 'assets/icons/keyboard_arrow_right_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as DoubleRightIcon} from 'assets/icons/keyboard_double_arrow_right_FILL0_wght600_GRAD0_opsz48.svg';
import styled from 'styled-components';

const Pagination = ({ paginationData, handlePageChange, ...props }) => {
  return (
    <StyledPagination className={props.className}>
      <p className="page-info">
        {paginationData.currentStart} - {paginationData.currentEnd} of {paginationData.total} items{' '}
      </p>
      <div className="page-control-buttons">
        <SquareTileButton Icon={DoubleLeftIcon} className="first" onClick={() => handlePageChange(1)}/>
        <SquareTileButton Icon={LeftIcon} className="previous" onClick={() => handlePageChange(paginationData.currentPage - 1)}/>
        <SquareTileButton Icon={RightIcon} className="next" onClick={() => handlePageChange(paginationData.currentPage + 1)}/>
        <SquareTileButton Icon={DoubleRightIcon} className="last" onClick={() => handlePageChange(paginationData.totalPages)}/>
      </div>
    </StyledPagination>
  );
};

export default styled(Pagination)``;
