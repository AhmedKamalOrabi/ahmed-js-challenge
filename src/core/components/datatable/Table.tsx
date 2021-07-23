import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Table as MTable, TableContainer, Paper } from '@material-ui/core';
import { EnhancedTableToolbar, EnhancedTableHead, EnhancedTableBody } from '.';
import { HeadCell } from '../../interfaces';

type Order = 'asc' | 'desc';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 500,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

interface TableProps {
  className?: string;
  headCells: HeadCell[];
  rowsData: any;
  page: number;
  rowsPerPage: number;
  withSelection: boolean;
  Model: any;
  loading: boolean;
  tableTitle: string;
  csvExporter?: React.ReactNode;
  searchInput?: React.ReactNode;
  orderByKey: string;
  sortOrder: Order;
}

export const Table: React.FC<TableProps> = ({
  headCells,
  rowsData,
  page,
  rowsPerPage,
  withSelection,
  Model,
  loading,
  tableTitle,
  csvExporter,
  searchInput,
  orderByKey,
  sortOrder,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>(sortOrder);
  const [orderBy, setOrderBy] = React.useState<string>(orderByKey);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof typeof Model,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property as string);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rowsData.data.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          tableTitle={tableTitle}
          numSelected={selected.length}
          csvExporter={csvExporter}
          searchInput={searchInput}
          totalCount={
            rowsData?.totalCount
              ? rowsData?.totalCount
              : rowsData?.data?.totalCount
          }
        />
        <TableContainer>
          <MTable
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead<typeof Model>
              headCells={headCells}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={String(orderBy)}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsData.totalCount}
              withSelection={withSelection}
            />
            {rowsData && (
              <EnhancedTableBody
                rowsData={rowsData}
                headCells={headCells}
                order={order}
                orderBy={String(orderBy)}
                page={page}
                rowsPerPage={rowsPerPage}
                isSelected={isSelected}
                withSelection={withSelection}
                handleClick={handleClick}
                loading={loading}
              />
            )}
          </MTable>
        </TableContainer>
      </Paper>
    </div>
  );
};
