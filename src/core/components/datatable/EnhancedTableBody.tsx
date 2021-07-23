import React from 'react';
import { TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core';
import { get } from 'lodash-es';
import { HeadCell } from '../../interfaces';

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableBodyProps {
  rowsData: any;
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  isSelected: (id: string) => boolean;
  withSelection: boolean;
  headCells: HeadCell[];
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  loading: boolean;
}

const renderCell = (item: any, { content, id }: HeadCell) => {
  if (content) return content(item);
  return get(item, id);
};

const getAlignDirection = (column: any) => {
  return column.numeric ? 'center' : 'left';
};
const getCellWidth = (column: any) => {
  return column.width ? column.width : 'auto';
};

export const EnhancedTableBody: React.FC<EnhancedTableBodyProps> = ({
  rowsData,
  order,
  orderBy,
  isSelected,
  withSelection,
  headCells,
  loading,
}) => {
  const data = rowsData.data || [];

  return (
    <TableBody>
      {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
        const isItemSelected = isSelected(String(row.id));
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            hover
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={`${row.id}-${labelId}`}
            selected={isItemSelected}
          >
            {withSelection && (
              <TableCell>
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
            )}

            {headCells.map((column: HeadCell) => (
              <TableCell
                key={`${row.id}-${String(column.id)}`}
                align={getAlignDirection(column)}
                style={{ width: getCellWidth(column) }}
              >
                {renderCell(row, column)}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
      {loading === false && data.length === 0 && (
        <TableRow style={{ height: 10 }}>
          <TableCell align="center" colSpan={headCells.length}>
            <span>No data to show</span>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
