import React from 'react';

const Pagination = ({pages, handlePageChange}) => {
  return (
    <div className="pagination">
      <p>
        {pages.currentStart} - {pages.currentEnd} of {pages.total} items{' '}
      </p>
      <button className="first" onClick={() => handlePageChange(1)}>
        First
      </button>
      <button className="previous" onClick={() => handlePageChange(pages.currentPage - 1)}>
        Previous
      </button>
      <button className="next" onClick={() => handlePageChange(pages.currentPage + 1)}>
        Next
      </button>
      <button className="last" onClick={() => handlePageChange(pages.totalPages)}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
