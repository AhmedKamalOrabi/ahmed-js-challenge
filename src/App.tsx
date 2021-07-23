import React, { Suspense, lazy } from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import 'reflect-metadata';
import { SnackbarProvider } from 'notistack';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { CustomersManagment } from './pages';
import { DependencyProvider } from './dependencyProvider';
import { container } from './dependencies';
import { Sidebar, ISidebarItem, ErrorBoundary, Loader } from './core';
import { version } from '../package.json';
import { MuiTheme } from './components/common';
import { translate } from './constants';
import './App.css';

const CreateCustomer = lazy(() => import('./pages/CreateCustomer'));
const UpdateCustomer = lazy(() => import('./pages/UpdateCustomer'));
const CustomersManagmentMaterial = lazy(
  () => import('./pages/CustomersManagmentMaterial'),
);

Sentry.init({
  dsn: 'https://3ba0936a8a404b4e90176fc4db600d1f@o518365.ingest.sentry.io/5875154',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const navigationItems: ISidebarItem[] = [
  {
    routeTo: '/customers',
    label: translate('sidebar.customer.text'),
    icon: <GroupIcon />,
  },
  {
    routeTo: '/material/customers',
    label: translate('sidebar.material-customer.text'),
    icon: <GroupIcon />,
  },
];

export const App: React.FC = () => {
  return (
    <Sentry.ErrorBoundary fallback={translate('errorboundry.error.text')}>
      <ErrorBoundary>
        <MuiTheme>
          <Suspense fallback={<Loader open={true} />}>
            <SnackbarProvider>
              <BrowserRouter>
                <DependencyProvider value={container}>
                  <shore-app-header
                    id="shore-app-header-with-help-link"
                    name={translate('app.title.text')}
                  />
                  <Grid container style={{ height: '100vh' }}>
                    <Grid
                      style={{ backgroundColor: '#e5e5e5' }}
                      item
                      xs={3}
                      md={2}
                    >
                      <Sidebar
                        pluginVersion={version}
                        navigationItems={navigationItems}
                      />
                    </Grid>
                    <Grid
                      style={{
                        padding: '40px',
                      }}
                      item
                      xs={9}
                      md={10}
                    >
                      <Switch>
                        <Route
                          exact
                          path="/customers/:customerId/update"
                          component={UpdateCustomer}
                        />
                        <Route
                          exact
                          path="/customers/create"
                          component={CreateCustomer}
                        />
                        <Route
                          exact
                          path="/material/customers"
                          component={CustomersManagmentMaterial}
                        />
                        <Route
                          exact
                          path="/customers"
                          component={CustomersManagment}
                        />
                        <Redirect from="/" to="/customers" />
                      </Switch>
                    </Grid>
                  </Grid>
                </DependencyProvider>
              </BrowserRouter>
            </SnackbarProvider>
          </Suspense>
        </MuiTheme>
      </ErrorBoundary>
    </Sentry.ErrorBoundary>
  );
};

export default App;
