import { get } from 'lodash-es';
import { ICustomer, IService } from 'interfaces';

export class CustomerModel implements ICustomer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  favoriteServices: IService[];
  constructor(customer = {}) {
    this.id = get(customer, 'id');
    this.name = get(customer, 'name', '');
    this.email = get(customer, 'email', '');
    this.phone = get(customer, 'phone', '');
    this.favoriteServices = get(customer, 'favoriteServices', []);
  }
}
