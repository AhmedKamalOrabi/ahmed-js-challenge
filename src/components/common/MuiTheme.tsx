import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    border: {
      light: string;
    };
    torqwas: {
      main: string;
      darkish: string;
    };
    sizes: {
      headerHeight: string;
      footerHeight: string;
    };
  }
  interface ThemeOptions {
    border: {
      light: string;
    };
    torqwas: {
      main: string;
      darkish: string;
    };
    sizes: {
      headerHeight: string;
      footerHeight: string;
    };
  }
}

export const WHITE = '#FFFFFF';
export const PRIMARY = '#00d0be';

const theme = createTheme({
  border: {
    light: '1px solid #DEDEDE',
  },
  palette: {
    primary: {
      main: PRIMARY,
    },
    text: {
      primary: '#222222',
    },
  },
  torqwas: {
    main: '#00d0be',
    darkish: '#00b6a6',
  },
  sizes: {
    headerHeight: '68px',
    footerHeight: '68px',
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});

interface TMuiThemeProps {
  children: React.ReactNode | React.ReactNode[];
}

export const MuiTheme: React.FC<TMuiThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
