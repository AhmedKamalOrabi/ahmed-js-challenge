import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    flex: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

type Box = {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export const Box: React.FC<Box> = ({ children, justifyContent }) => {
  const classes = useStyles();
  return (
    <div className={classes.flex} style={{ justifyContent }}>
      {children}
    </div>
  );
};
