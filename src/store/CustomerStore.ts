import { ICustomer } from 'interfaces';
import { injectable } from 'inversify';
import { observable } from 'mobx';
import { getCustomers } from '../api';

@injectable()
export class CustomerStore {
  @observable customers: ICustomer[] = [];

  async fetchCustomers(): Promise<ICustomer[]> {
    this.customers = await getCustomers();
    return Promise.resolve(this.customers);
  }

  async addNewCustomer(customer: ICustomer): Promise<void> {
    this.customers.push(customer);
  }

  async updateExistCustomer(updatedCustomer: ICustomer): Promise<void> {
    const { id } = updatedCustomer;
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    this.customers.splice(customerIndex, 1, updatedCustomer);
  }
}
