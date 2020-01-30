export interface CellDataType {
  [key: number]: { value: string, inputValue: string }
}

export interface CellType {
  x: number;
  y: number;
}

export interface SpreadSheetContextType {
  data: { [key: string]: CellDataType };
  updateData: (data: { [key: string]: CellDataType }) => void;
}