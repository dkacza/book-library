import React from 'react';
import Wrapper from 'components/molecules/Pagination/Pagination.styles';
import SquareTileButton from 'components/atoms/SquareTileButton';

import {ReactComponent as LeftIcon} from 'assets/icons/keyboard_arrow_left_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as DoubleLeftIcon} from 'assets/icons/keyboard_double_arrow_left_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as RightIcon} from 'assets/icons/keyboard_arrow_right_FILL0_wght600_GRAD0_opsz48.svg';
import {ReactComponent as DoubleRightIcon} from 'assets/icons/keyboard_double_arrow_right_FILL0_wght600_GRAD0_opsz48.svg';

const Pagination = ({ pages, handlePageChange }) => {
  return (
    <Wrapper className="pagination">
      <p className="page-info">
        {pages.currentStart} - {pages.currentEnd} of {pages.total} items{' '}
      </p>
      <div className="page-control-buttons">
        <SquareTileButton Icon={DoubleLeftIcon} className="first" onClick={() => handlePageChange(1)}/>
        <SquareTileButton Icon={LeftIcon} className="previous" onClick={() => handlePageChange(pages.currentPage - 1)}/>
        <SquareTileButton Icon={RightIcon} className="next" onClick={() => handlePageChange(pages.currentPage + 1)}/>
        <SquareTileButton Icon={DoubleRightIcon} className="last" onClick={() => handlePageChange(pages.totalPages)}/>
      </div>
    </Wrapper>
  );
};

export default Pagination;
