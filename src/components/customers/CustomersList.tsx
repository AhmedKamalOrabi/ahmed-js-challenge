import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { withDependencies } from '../../dependencyProvider';
import { ICustomer, IService } from '../../interfaces';
import { CustomerStore } from '../../store/CustomerStore';
import { translate } from '../../constants';

interface CustomersListProps {
  customerStore: CustomerStore;
}

export const CustomersList: React.FC<CustomersListProps> = ({
  customerStore,
}) => {
  const history = useHistory();
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const renderServices = (services: IService[]) => {
    return services.map((servie) => servie.name).join(', ');
  };

  const fetchCustomers = async () => {
    await customerStore.fetchCustomers();
    setCustomers(customerStore.customers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const renderRow = (customer: ICustomer) => {
    const { id, name, phone, email, favoriteServices } = customer;
    return (
      <shore-table-row key={id}>
        <shore-table-cell>{name}</shore-table-cell>
        <shore-table-cell>{phone}</shore-table-cell>
        <shore-table-cell>{email}</shore-table-cell>
        <shore-table-cell>
          {renderServices(favoriteServices as IService[])}
        </shore-table-cell>
        <shore-table-cell>
          <IconButton
            onClick={() =>
              history.push({
                pathname: `/customers/${id}/update`,
                state: customer,
              })
            }
          >
            <EditIcon />
          </IconButton>
        </shore-table-cell>
      </shore-table-row>
    );
  };

  const renderBody = () => {
    return <shore-table-body>{customers.map(renderRow)}</shore-table-body>;
  };

  const renderHeader = () => {
    return (
      <shore-table-head>
        <shore-table-row>
          <shore-table-cell>
            {translate('customer.list.head.name')}
          </shore-table-cell>
          <shore-table-cell>
            {translate('customer.list.head.phone')}
          </shore-table-cell>
          <shore-table-cell>
            {translate('customer.list.head.email')}
          </shore-table-cell>
          <shore-table-cell>
            {translate('customer.list.head.services')}
          </shore-table-cell>
          <shore-table-cell>
            {translate('customer.list.head.action')}
          </shore-table-cell>
        </shore-table-row>
      </shore-table-head>
    );
  };

  return (
    <shore-table>
      {renderHeader()}
      {renderBody()}
    </shore-table>
  );
};

export default withDependencies({
  customerStore: 'customerStore',
})(observer(CustomersList));
