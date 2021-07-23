import { v1 } from 'uuid';
import { isValidRequired, isValidEmail, isValidPhone } from './constants';

const keyBy = (k, xs) =>
  xs.reduce(
    (target, x) => ({
      ...target,
      [x[k]]: x,
    }),
    {},
  );

const services = keyBy(
  'id',
  [
    {
      name: 'Wash',
      durationInMinutes: 15,
    },
    {
      name: 'Dye',
      durationInMinutes: 90,
    },
    {
      name: 'Trim',
      durationInMinutes: 60,
    },
    {
      name: 'Dry',
      durationInMinutes: 10,
    },
  ].map((service) => ({
    ...service,
    id: v1(),
  })),
);

export const customers = keyBy(
  'id',
  [
    {
      name: 'Little My',
      email: 'little.my@moomin.valley',
      phone: '',
      favoriteServices: [
        Object.values(services)[0],
        Object.values(services)[1],
      ],
    },
    {
      name: 'Snufkin',
      email: 'greenhat@digitalnomad.com',
      phone: '',
      favoriteServices: [Object.values(services)[3]],
    },
    {
      name: 'Moomintroll',
      email: '',
      phone: '1 (000) 909-0990',
      favoriteServices: [],
    },
    {
      name: 'The Groke',
      email: '',
      phone: '1 (000) 000-0000',
      favoriteServices: [
        Object.values(services)[1],
        Object.values(services)[3],
      ],
    },
  ].map((customer) => ({
    ...customer,
    id: v1(),
  })),
);

export const getServices = () => {
  return Promise.resolve(Object.values(services));
};

export const getCustomers = () => {
  return Promise.resolve(Object.values(customers));
};

export const getCustomer = (id) => {
  const customer = customers[id];
  if (customer) {
    return Promise.resolve(customer);
  } else {
    return Promise.reject(`This ${id} does not exist`);
  }
};

export const createCustomer = async (customerData) => {
  const validation = await validateCustomerData(customerData);
  if (!validation.isValid) {
    return Promise.reject(validation.errors);
  }

  const id = v1();
  const customer = { ...customerData, id };
  customers[id] = customer;
  return Promise.resolve(customer);
};

export const updateCustomer = async (id, customerData) => {
  if (!customers[id]) {
    return Promise.reject([`Customer ${id} not found`]);
  }

  const update = { ...customers[id], ...customerData };
  const validation = await validateCustomerData(update);

  if (!validation.isValid) {
    return Promise.reject(validation.errors);
  }

  customers[id] = { ...customers[id], ...customerData };

  return Promise.resolve(customers[id]);
};

const validateCustomerData = async (customerData) => {
  const { email, phone } = customerData;
  if (email && phone) {
    return {
      isValid: true,
      errors: {},
    };
  }
  return {
    isValid: false,
    errors: {
      email: [isValidRequired('email', email), isValidEmail(email)].find(
        (rule) => Boolean(rule),
      ),
      phone: [isValidRequired('phone', phone), isValidPhone(phone)].find(
        (rule) => Boolean(rule),
      ),
    },
  };
};
