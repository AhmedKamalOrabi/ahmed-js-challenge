import { IService } from './IService';

export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  favoriteServices: IService[];
}
