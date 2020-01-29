import React from 'react';
import Row from '../Row/Row';
import { RowDataType } from '../../../../types/types';

type TableProps = {
  x: number;
  y: number;
};

type TableState = {
  data: { [key: string]: RowDataType };
};

export default class Table extends React.PureComponent<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      data: {},
    }
  };

  render() {
    const rows = [];
    for (let y = 0; y < this.props.y + 1; y++) {
      const rowData = this.state.data[y] || {};
      rows.push(
        <Row
          key={y}
          y={y}
          x={this.props.x + 1}
          rowData={rowData}
        />,
      )
    };

    return (
      <div>
        {rows}
      </div>
    )
  }
};