import React, { Component } from 'react';
import './App.css';

import {
  // eslint-disable-next-line
  createCustomer,
  getCustomers,
  getServices,
  // eslint-disable-next-line
  updateCustomer,
} from './api';

class CustomersList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      customers: [],
      services: [],
    };
  }

  componentDidMount() {
    getServices().then((services) => {
      this.setState((state) => ({
        ...state,
        services,
      }));
    });

    getCustomers().then((customers) => {
      this.setState((state) => ({
        ...state,
        customers,
      }));
    });

  }

  renderServices = (serviceIds) => {
    return serviceIds.map((id) => {
      const service = this.state.services.find((service) => service.id === id);
      return service ? service.name : "";
    }).join(", ");
  }

  renderRow = (customer) => {
    return (
      <shore-table-row key={customer.id}>
        <shore-table-cell>{customer.name}</shore-table-cell>
        <shore-table-cell>{customer.phone}</shore-table-cell>
        <shore-table-cell>{customer.email}</shore-table-cell>
        <shore-table-cell>
          {this.renderServices(customer.favoriteServices)}
        </shore-table-cell>
      </shore-table-row>
    );
  }

  renderBody = () => {
    return (
      <shore-table-body>
        {this.state.customers.map(this.renderRow)}
      </shore-table-body>
    );
  }

  renderHeader = () => {
    return (
      <shore-table-head>
        <shore-table-row>
          <shore-table-cell>Name</shore-table-cell>
          <shore-table-cell>Phone</shore-table-cell>
          <shore-table-cell>Email</shore-table-cell>
          <shore-table-cell>Favorite Services</shore-table-cell>
        </shore-table-row>
      </shore-table-head>
    );
  }

  render() {
    return (
      <shore-table>
        {this.renderHeader()}
        {this.renderBody()}
      </shore-table>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <shore-app-header
          id="shore-app-header-with-help-link"
          name="Moomin Hair Salon > Customers" />
        <CustomersList />
      </div>
    );
  }
}

export default App;
