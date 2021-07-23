import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { GroupSharp } from '@material-ui/icons';
import CustomersList from '../components/customers/CustomersList';
import { Box } from '../components/common';
import { CustomBreadcrumbs } from '../core';
import { translate } from '../constants';

const breadcrumbsRoutes = [
  {
    routeTo: '/customers',
    label: translate('breadcrumb.customer.list'),
    isLink: false,
    icon: <GroupSharp />,
  },
];

export const CustomersManagment: React.FC = () => {
  const history = useHistory();

  const goToCreateCustomerPage = () => {
    history.push('/customers/create');
  };

  return (
    <Fragment>
      <CustomBreadcrumbs routes={breadcrumbsRoutes} />
      <Box justifyContent="space-between">
        <h1>{translate('page.title.text')}</h1>
        <shore-button onClick={goToCreateCustomerPage} variant="primary">
          <shore-icon name="new-customer"></shore-icon>
          <span>{translate('customer.button.add')}</span>
        </shore-button>
      </Box>
      <CustomersList />
    </Fragment>
  );
};
