export interface HeadCell<T = any> {
  disablePadding: boolean;
  id: keyof T | 'actions' | string;
  label?: string;
  numeric: boolean;
  content?: (row?: any) => JSX.Element | null;
  sort?: boolean;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
}
