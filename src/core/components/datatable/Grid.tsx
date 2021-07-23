import React, { Fragment } from 'react';
import { TablePagination } from '@material-ui/core';
import { Table } from './Table';
import { HeadCell } from '../../interfaces';

type Order = 'asc' | 'desc';

interface GridProps {
  headCells: HeadCell[];
  withPagination?: boolean;
  withSort?: boolean;
  withSelection?: boolean;
  rowsData: any;
  page?: number;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  Model?: any;
  tableTitle: string;
  csvExporter?: React.ReactNode;
  searchInput?: React.ReactNode;
  orderByKey?: string;
  sortOrder?: Order;
}

export const Grid: React.FC<GridProps> = ({
  headCells,
  rowsData,
  page = 0,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  loading = false,
  withPagination = true,
  withSelection = true,
  Model,
  tableTitle,
  csvExporter,
  searchInput,
  orderByKey = headCells[0].id,
  sortOrder = 'asc',
}): JSX.Element => {
  return (
    <Fragment>
      <Table
        headCells={headCells}
        rowsData={rowsData}
        page={page}
        rowsPerPage={rowsPerPage}
        withSelection={withSelection}
        Model={Model}
        loading={loading}
        tableTitle={tableTitle}
        csvExporter={csvExporter}
        searchInput={searchInput}
        orderByKey={orderByKey as string}
        sortOrder={sortOrder}
      />
      {withPagination && onPageChange && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
          count={rowsData.totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Fragment>
  );
};
