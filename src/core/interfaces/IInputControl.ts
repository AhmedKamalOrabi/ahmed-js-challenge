import { ReactNode } from 'react';
import { Size } from '../types';
export type GridSpace =
  | false
  | 'auto'
  | true
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

type InputType =
  | 'text'
  | 'password'
  | 'phone'
  | 'email'
  | 'number'
  | 'search'
  | 'tel';

export interface GridClasses {
  xs: GridSpace;
  sm: GridSpace;
  md: GridSpace;
  lg: GridSpace;
}

export interface IInputControl {
  id?: string;
  name: string | string[];
  label?: string | (() => JSX.Element);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  type?: InputType;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  shrink?: boolean;
  error?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  helperText?: ReactNode;
  autoFocus?: boolean;
  fullWidth?: boolean;
  autoComplete?: string;
  gridClasses?: Partial<GridClasses>;
  size?: Size;
  togglePassword?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: any;
  outline?: boolean;
  locale?: boolean;
  hidden?: boolean;
  style?: Record<string, never>;
  rules?: Record<string, never>;
}
