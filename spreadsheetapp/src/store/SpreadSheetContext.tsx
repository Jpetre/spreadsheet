import React from 'react';
import { CellDataType } from '../../../types/types';

export const SpreadSheetContext = React.createContext({
  data: {},
  updateData: (data: { [key: string]: CellDataType }) => { }
});
