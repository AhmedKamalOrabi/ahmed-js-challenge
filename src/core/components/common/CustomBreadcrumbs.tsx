import React from 'react';
import { Breadcrumbs, Link, Typography, Theme } from '@material-ui/core';
import { NavLink, useParams } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, createStyles, withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      '& .op-MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
      },
    },
    homeIcon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    flex: {
      display: 'flex',
    },
  }),
);

const StyledNavLink = withStyles(() => ({
  root: {
    color: '#838383',
    textDecoration: 'none',
    display: 'flex',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))(NavLink);

interface CustomBreadcrumbsProps {
  routes: {
    routeTo: string | ((params?: any) => any);
    label: string;
    isLink: boolean;
    icon?: JSX.Element;
  }[];
}

export const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({
  routes,
}) => {
  const params = useParams();
  const classes = useStyles();

  const getRouteToValue = (routeTo: string | ((params?: any) => any)) => {
    if (typeof routeTo === 'function') {
      return routeTo(params);
    } else {
      return routeTo;
    }
  };

  if (routes?.length === 0) return null;

  return (
    <Breadcrumbs style={{ marginBottom: '40px' }} aria-label="breadcrumb">
      <Link className={classes.flex} color="inherit" href="/">
        <HomeIcon className={classes.homeIcon} />
        Home
      </Link>
      {routes &&
        routes.map((route) =>
          route.isLink ? (
            <StyledNavLink
              key={route.label}
              to={getRouteToValue(route.routeTo)}
            >
              <span className={classes.iconContainer}>
                <span className={classes.icon}>{route.icon}</span>
                <span>{route.label}</span>
              </span>
            </StyledNavLink>
          ) : (
            <Typography
              className={classes.flex}
              key={route.label}
              color="textPrimary"
            >
              <span className={classes.iconContainer}>
                <span className={classes.icon}>{route.icon}</span>
                <span>{route.label}</span>
              </span>
            </Typography>
          ),
        )}
    </Breadcrumbs>
  );
};
