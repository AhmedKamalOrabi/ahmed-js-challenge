import React, { Fragment } from 'react';
import GroupSharp from '@material-ui/icons/GroupSharp';
import { CustomBreadcrumbs } from '../core';
import CustomerForm from '../components/customers/CustomerForm';
import { translate } from '../constants';

const breadcrumbsRoutes = [
  {
    routeTo: '/customers',
    label: translate('breadcrumb.customer.list'),
    isLink: true,
    icon: <GroupSharp />,
  },
  {
    routeTo: '',
    label: translate('breadcrumb.customer.create'),
    isLink: false,
  },
];

export const CreateCustomer: React.FC = () => {
  return (
    <Fragment>
      <CustomBreadcrumbs routes={breadcrumbsRoutes} />
      <h1>{translate('customer.create.title')}</h1>
      <CustomerForm />
    </Fragment>
  );
};

export default CreateCustomer;
