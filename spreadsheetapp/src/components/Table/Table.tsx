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

export const SpreadSheetContext = React.createContext({
  data: {},
  updateData: (data: { [key: string]: RowDataType }) => { }
});

export default class Table extends React.PureComponent<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    let data: { [key: string]: RowDataType } = {};
    for (let x = 1; x < this.props.x + 1; x++) {
      for (let y = 1; y < this.props.y + 1; y++) {
        data[x] = {
          ...data[x],
          [y]: {
            value: '',
            inputValue: '',
          }
        }
      }
    }

    this.state = {
      data,
    }
  };

  updateData = (data: { [key: string]: RowDataType }) => {
    console.log('data update', data);
    this.setState({
      data
    });
  }

  render() {
    const rows = [];
    for (let y = 0; y < this.props.y + 1; y++) {
      rows.push(
        <Row
          key={y}
          y={y}
          x={this.props.x + 1}
        />,
      )
    };

    return (
      <div>
        <SpreadSheetContext.Provider
          value={{
            data: this.state.data,
            updateData: this.updateData
          }}
        >
          {rows}
        </SpreadSheetContext.Provider>
      </div>
    )
  }
};