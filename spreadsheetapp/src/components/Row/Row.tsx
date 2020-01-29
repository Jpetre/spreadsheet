import React from 'react';
import Cell from '../Cell/Cell';

type RowProps = {
  x: number;
  y: number;
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