import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';

// import { Container } from './styles';

interface IPaginate {
  page: number;
  pageCount: number;
  pageChange(page: number): void;
}

const PaginateComponent: React.FC<IPaginate> = ({ page, pageCount, pageChange }: IPaginate) => {
  return (
    <ReactPaginate
      disableInitialCallback
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      pageCount={Math.ceil(pageCount)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      forcePage={page - 1}
      onPageChange={({ selected }) => {
        pageChange(selected + 1);
      }}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  )
}


export const Paginate = memo(PaginateComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
})
