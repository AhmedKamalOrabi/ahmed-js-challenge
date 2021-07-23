/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

type Key = { [key: string]: string };

export const translations_en: Key = {
  'page.title.text': 'Customers management',
  'sidebar.customer.text': 'Customers managment',
  'sidebar.material-customer.text': 'Customers list material',
  'breadcrumb.customer.list': 'Customer management',
  'breadcrumb.material-customer.list': 'Customers list material',
  'breadcrumb.customer.create': 'Create',
  'breadcrumb.customer.update': 'Update',
  'errorboundry.error.text': 'An error has occurred',
  'app.title.text': 'Moomin Hair Salon',
  'customer.button.add': 'Add new customer',
  'customer.list.head.name': 'Name',
  'customer.list.head.phone': 'Phone',
  'customer.list.head.email': 'Email',
  'customer.list.head.services': 'Favorite Services',
  'customer.list.head.action': 'Action',
  'customer.create.title': 'Create customer',
  'customer.update.title': 'Update customer',
  'customer.error.name': 'Name is required',
  'customer.error.email': 'Email is required',
  'customer.error.email.invalid': 'Please enter valid email',
  'customer.error.phone': 'Phone is required',
  'customer.error.phone.invalid': 'Please enter valid phone',
  'customer.button.create': 'Create',
  'customer.button.update': 'Update',
};

const translations_ar: Key = {
  'page.title.text': 'العملاء',
};

export const translate = (
  key: keyof typeof translations_en,
  locale?: 'en' | 'ar',
): string => {
  if (locale) {
    switch (locale) {
      case 'en':
        return translations_en[key];
        break;
      case 'ar':
        return translations_ar[key];
        break;
      default:
        throw new Error('There is no locale by with this value');
    }
  }
  return translations_en[key];
};
