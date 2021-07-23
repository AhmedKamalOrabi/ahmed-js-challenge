import React from 'react';
import {
  TableHead,
  TableCell,
  TableRow,
  Checkbox,
  TableSortLabel,
} from '@material-ui/core';
import { useStyles } from './Table';
import { HeadCell } from '../../interfaces';

type Order = 'asc' | 'desc';

interface EnhancedTableProps<T = any> {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
  withSelection?: boolean;
}

export const EnhancedTableHead = <T extends any>(
  props: EnhancedTableProps<T>,
): any => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    withSelection = true,
  } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {withSelection && (
          <TableCell>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        )}
        {headCells.map(
          (
            {
              id,
              numeric,
              disablePadding,
              label,
              sort,
              width = 'auto',
              maxWidth = 'auto',
            }: HeadCell,
            index: number,
          ) => (
            <TableCell
              key={`${String(id)}-${label}-${index}`}
              align={numeric ? 'center' : 'left'}
              padding={disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === id ? order : false}
              style={{ minWidth: width, maxWidth }}
            >
              {sort ? (
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : 'asc'}
                  onClick={createSortHandler(id as keyof T)}
                >
                  {label}
                  {orderBy === id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : (
                label
              )}
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
};
