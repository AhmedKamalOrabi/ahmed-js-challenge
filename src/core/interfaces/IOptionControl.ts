/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOptionControl {
  options?: any[];
  getOptionsData?(param?: any): Promise<any[]>;
  valueProperty?: string;
  textProperty?: string;
  keyProperty?: string;
}
