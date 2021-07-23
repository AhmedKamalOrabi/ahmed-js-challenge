import React from 'react';
import clsx from 'clsx';
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Box,
  Grid,
  Chip,
} from '@material-ui/core';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  tableTitle: string;
  csvExporter?: React.ReactNode;
  searchInput?: React.ReactNode;
  totalCount: number;
}

export const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = (
  props,
) => {
  const classes = useToolbarStyles();
  const { numSelected, tableTitle, csvExporter, searchInput, totalCount } =
    props;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : searchInput ? (
          <Grid container>{searchInput}</Grid>
        ) : (
          <h2>
            {tableTitle}{' '}
            {totalCount > 0 && (
              <Tooltip placement="top" title="Total records count">
                <Chip
                  color="primary"
                  label={`${totalCount} record(s)`}
                  variant="outlined"
                />
              </Tooltip>
            )}
          </h2>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip placement="top" title="Export CSV file">
            <div>{csvExporter}</div>
          </Tooltip>
        )}
      </Toolbar>
    </Box>
  );
};
