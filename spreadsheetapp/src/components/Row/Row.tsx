import React from 'react';
import Cell from '../Cell/Cell';
import { RowDataType } from '../../../../types/types';

type RowProps = {
  x: number;
  y: number;
  rowData: RowDataType;
};

const Row: React.FC<RowProps> = (props: RowProps) => {
  const cells = [];
  const y = props.y;
  for (let x = 0; x < props.x; x += 1) {
    cells.push(
      <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        value={(props.rowData[x] && props.rowData[x].value) || ''}
        inputValue={(props.rowData[x] && props.rowData[x].inputValue) || ''}
      />,
    );
  };
  return (
    <div className='Row'>
      {cells}
    </div>
  );
};

export default Row;