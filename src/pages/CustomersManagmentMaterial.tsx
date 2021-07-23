import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button } from '@material-ui/core';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { GroupSharp } from '@material-ui/icons';
import { IDataResponse, Loader, CustomBreadcrumbs } from '../core';
import { getCustomers } from '../api';
import { CustomerModel } from '../models';
import { CustomersListMaterial } from '../components';
import { translate } from '../constants';

const breadcrumbsRoutes = [
  {
    routeTo: '/customers',
    label: translate('breadcrumb.material-customer.list'),
    isLink: false,
    icon: <GroupSharp />,
  },
];

export const CustomersManagmentMaterial: React.FC = () => {
  const [rowsData, setRowsData] = useState<
    IDataResponse<CustomerModel> | Record<string, unknown>
  >({});
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const fetchRowsData = async () => {
    setLoading(true);
    const customers = await getCustomers();
    setRowsData({ data: customers, totalCount: customers?.length });
    setLoading(false);
  };

  useEffect(() => {
    fetchRowsData();
  }, []);

  return (
    <Fragment>
      <Loader open={loading} />
      <CustomBreadcrumbs routes={breadcrumbsRoutes} />
      <Box
        style={{ marginBottom: '24px', marginTop: '24px' }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          style={{ fontWeight: 'bold' }}
          color="textPrimary"
          variant="h5"
        >
          Customers management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
          startIcon={<AddOutlinedIcon />}
          onClick={() => history.push('/customers/create')}
        >
          {translate('customer.button.add')}
        </Button>
      </Box>
      <CustomersListMaterial rowsData={rowsData as IDataResponse} />
    </Fragment>
  );
};

export default CustomersManagmentMaterial;
