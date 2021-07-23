import { requiredRegex, emailRegex, phoneRegex } from '../core';

export const isValidRequired = (
  key: string,
  value: string,
): string | unknown => {
  if (!value || !value?.match(requiredRegex)) return `${key} is required`;
};

export const isValidEmail = (value: string): string | unknown => {
  if (!value?.match(emailRegex)) return `Please enter valid email`;
};

export const isValidPhone = (value: string): string | unknown => {
  if (!value?.match(phoneRegex)) return `Please enter valid phone`;
};
