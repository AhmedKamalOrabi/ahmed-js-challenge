import React, { Fragment, useState, useEffect } from 'react';
import { CustomerModel } from 'models';
import { useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import GroupSharp from '@material-ui/icons/GroupSharp';
import CustomerForm from '../components/customers/CustomerForm';
import { getCustomer } from '../api';
import { Loader, CustomBreadcrumbs } from '../core';
import { translate } from '../constants';

interface Params {
  customerId: string;
}

const breadcrumbsRoutes = [
  {
    routeTo: '/customers',
    label: translate('breadcrumb.customer.list'),
    isLink: true,
    icon: <GroupSharp />,
  },
  {
    routeTo: '',
    label: translate('breadcrumb.customer.update'),
    isLink: false,
  },
];

export const UpdateCustomer: React.FC = () => {
  const { state: customerData } = useLocation<CustomerModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar: alert } = useSnackbar();
  const { customerId } = useParams<Params>();
  const [customer, setCustomer] = useState<CustomerModel | null>(null);

  const fetchCustomer = async (customerId: string) => {
    try {
      setLoading(true);
      const customer = await getCustomer(customerId);
      setCustomer(customer);
    } catch (error) {
      alert(error, {
        variant: 'error',
        persist: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerData) {
      setCustomer(customerData);
    } else {
      fetchCustomer(customerId);
    }
  }, [customerId, customerData]);

  return (
    <Fragment>
      <CustomBreadcrumbs routes={breadcrumbsRoutes} />
      <Loader open={loading} />
      <h1>{translate('customer.update.title')}</h1>
      {customer && <CustomerForm customer={customer} />}
    </Fragment>
  );
};

export default UpdateCustomer;
