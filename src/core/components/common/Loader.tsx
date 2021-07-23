import React from 'react';
import { Backdrop, CircularProgress, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1300,
      color: '#fff',
    },
  }),
);

interface LoaderProps {
  open: boolean;
  onBackdropClose?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ open = false }) => {
  const classes = useStyles();
  return (
    <Backdrop
      style={{ zIndex: 99999999999 }}
      className={classes.backdrop}
      open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
