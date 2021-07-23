import React from 'react';
import { List, ListItem, ListItemText, Box, Theme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/styles';
import { ISidebarItem } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      '& .op-MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
        color: theme.palette.text.secondary,
      },
    },
  }),
);

interface SidebarProps {
  navigationItems: ISidebarItem[];
  pluginVersion?: string | number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  navigationItems,
  pluginVersion,
}) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexGrow={1}
      flexDirection="column"
      justifyContent="space-between"
      style={{ height: '100%' }}
    >
      <List style={{ paddingTop: '20px' }}>
        {navigationItems.map(
          ({ routeTo, label, show = true, icon }: ISidebarItem) =>
            show && (
              <ListItem
                button
                key={routeTo}
                to={routeTo}
                activeStyle={{
                  color: 'black',
                  borderLeft: '4px solid #00d0be',
                }}
                component={NavLink}
              >
                <span className={classes.icon}>{icon}</span>
                <ListItemText primary={label} />
              </ListItem>
            ),
        )}
      </List>
      <footer style={{ paddingLeft: '10px' }}>
        <p>
          Version: <span style={{ color: '#00d0be' }}>{pluginVersion}</span>
        </p>
      </footer>
    </Box>
  );
};
