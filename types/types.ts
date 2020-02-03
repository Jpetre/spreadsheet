export interface CellDataType {
  [key: string]: { value: string | number, inputValue: string }
}

export interface ColumnDataType {
  [key: string]: CellDataType
}

export interface CellType {
  x: number;
  y: number;
}

export interface SpreadSheetContextType {
  data: ColumnDataType;
  updateData: (data: ColumnDataType) => void;
}