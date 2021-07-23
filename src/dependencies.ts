import { Container } from 'inversify';
import { CustomerStore } from './store/CustomerStore';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<CustomerStore>('customerStore').to(CustomerStore);

export { container };
