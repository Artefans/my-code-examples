import React from 'react';
import { ArrowIcon } from '../../SvgComponents';
import { DOTS, usePagination } from '../../utils/usePagination';

/**
 * @param {string, number} currentPage
 * @param {any} setCurrentPage
 * @param {string, number} perPage
 * @param {string, number} totalCount
 */


function Pagination({ currentPage, totalCount, setCurrentPage, perPage }) {
  const paginationRange = usePagination({
    currentPage: +currentPage,
    totalCount: totalCount,
    siblingCount: 1,
    pageSize: perPage,
  }) || [];

  let lastPage = paginationRange[paginationRange?.length - 1];

  if (paginationRange?.length < 2) {
    return <div className="pagination-container" />;
  }

  function renderPaginationItem(item, index) {
    const handleClick = (event) => setCurrentPage(event.target.dataset.page);

    if (item === DOTS) {
      return <li key={index.toString()} className="pagination-item dots">&#8230;</li>;
    }

    return (
      <li key={index.toString()}>
        <a data-page={item} className={`pagination-item ${+item === +currentPage && 'selected'}`} onClick={handleClick}>
          {+item < 10 ? `0${item}` : item}
        </a>
      </li>
    );
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ul className="pagination-container flex flex__align-center">
      <li className={`pagination-item ${+currentPage === 1 && 'disabled'} flex flex__center arrow left`}
        onClick={onPrevious}>
        <ArrowIcon />
      </li>
      {paginationRange.map(renderPaginationItem)}
      <li className={`pagination-item ${+currentPage === lastPage && 'disabled'} flex flex__center arrow right`}
        onClick={onNext}>
        <ArrowIcon />
      </li>
    </ul>
  );
}

export default Pagination;
