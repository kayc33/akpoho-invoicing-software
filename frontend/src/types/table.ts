import { SelectOption } from 'src/store/types';

type FieldFn = (row: TableRow) => string;
//declare type Format = (value: string) => string;

interface Formatter<ValueType, RowType, FormattedType> {
  (value: ValueType, row: RowType): FormattedType;
}

declare function SortStringToBooleanFn(arg1: string, arg2: string): boolean;
declare function SortStringToNumberFn(arg1: string, arg2: string): number;
declare function SortNumberFn(arg1: number, arg2: number): number;

export type InputTypes = 'text' | 'select' | 'date';
export interface TableRow {
  name: string | Enumerator | unknown;
  label: string;
  align?: string;
  sortable?: boolean;
  sort?:
    | typeof SortStringToBooleanFn
    | typeof SortNumberFn
    | typeof SortStringToNumberFn;
  field: string | FieldFn | unknown;
  required?: boolean;
  format?: Formatter<unknown, unknown, unknown> | null;
  filterable?: boolean;
  filterInputType?: InputTypes;
  filterOptions?: SelectOption[];
}

export interface GenericTableData extends Array<unknown> {
  [index: number]: unknown;
}

export interface TableRequestInterface {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string;
    descending: boolean;
  };
}

export interface PaginationParams {
  page: number;
  descending: boolean;
  perPage: number;
  sortBy: string;
}

export interface RowProps {
  row: { id: string };
}

export interface PropObject {
  [index: string]: string;
}

export interface FetchTableDataInterface {
  (options?: {
    paginationParams?: PaginationParams;
    queryObject?: { [index: string]: string | boolean };
  }): Promise<void>;
}
