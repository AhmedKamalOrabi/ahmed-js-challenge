import { v1 } from 'uuid';

const keyBy = (k, xs) => xs.reduce((target, x) => ({
  ...target,
  [x[k]]: x,
}), {});

const services = keyBy('id', [
  {
    name: "Wash",
    durationInMinutes: 15,
  },
  {
    name: "Dye",
    durationInMinutes: 90,
  },
  {
    name: "Trim",
    durationInMinutes: 60,
  },
  {
    name: "Dry",
    durationInMinutes: 10,
  },
].map((service) => ({
  ...service,
  id: v1(),
})))

const customers = keyBy('id', [
  {
    name: "Little My",
    email: "little.my@moomin.valley",
    phone: "",
    favoriteServices: [
      Object.values(services)[0].id,
      Object.values(services)[1].id,
    ],
  },
  {
    name: "Snufkin",
    email: "greenhat@digitalnomad.com",
    phone: "",
    favoriteServices: [
      Object.values(services)[3].id,
    ],
  },
  {
    name: "Moomintroll",
    email: "",
    phone: "1 (000) 909-0990",
    favoriteServices: [],
  },
  {
    name: "The Groke",
    email: "",
    phone: "1 (000) 000-0000",
    favoriteServices: [
      Object.values(services)[1].id,
      Object.values(services)[3].id,
    ],
  }
].map((customer) => ({ 
  ...customer, 
  id: v1(), 
})));

export const getServices = () => {
  return Promise.resolve(Object.values(services));
};

export const getCustomers = () => {
  return Promise.resolve(Object.values(customers));
};

export const createCustomer = (customerData) => {
  const validation = validateCustomerData(customerData);

  if (!validation.isValid) {
    return Promise.reject(validation.errors);
  }

  const id = v1();
  const customer = { ...customerData, id };
  customers[id] = customer;
  return Promise.resolve(customer);
};

export const updateCustomer = (id, customerData) => {
  if (!customers[id]) {
    return Promise.reject([`Customer ${id} not found`]);
  }

  const update = { ...customers[id], ...customerData };
  const validation = validateCustomerData(update);

  if (!validation.isValid) {
    return Promise.reject(validation.errors);
  }

  customers[id] = { ...customers[id], ...customerData };

  return Promise.resolve(customers[id]);
};

const validateCustomerData = (customerData) => {
  if (customerData.email || customerData.phone) {
    return {
      isValid: true,
      errors: [],
    };
  }

  return {
    isValid: false,
    errors: ['Please provide an email address or phone number'],
  };
};
