export type Size = 'small' | 'medium' | undefined;
export type Color = 'default' | 'primary' | 'secondary' | undefined;
export type Placement = 'bottom' | 'end' | 'start' | 'top' | undefined;
export type Variant = 'contained' | 'outlined' | 'text' | undefined;
export type Coordinate = { lat: number; lng: number };
export type SelectOption = {
  id: string | number | boolean;
  text: string | number | JSX.Element;
};
export type Any =
  | number
  | string
  | boolean
  | Record<string, unknown>
  | Array<Any>;
