import React from 'react';
import { ColumnDataType } from '../../../types/types';

export const SpreadSheetContext = React.createContext({
  data: {},
  updateData: (data: ColumnDataType) => { }
});
