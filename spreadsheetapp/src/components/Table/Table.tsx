import React from 'react';
import { env } from '../../config/config';
import Row from '../Row/Row';
import { CellDataType } from '../../../../types/types';

type TableProps = {
  x: number;
  y: number;
};

type TableState = {
  data: { [key: string]: CellDataType };
};

export const SpreadSheetContext = React.createContext({
  data: {},
  updateData: (data: { [key: string]: CellDataType }) => { }
});

export default class Table extends React.PureComponent<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    let data: { [key: string]: CellDataType } = {};
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

  fetchComputations = (computations: string) =>
    fetch(`${env.API}${computations}`)
      .then(res => res.json());

  updateData = (data: { [key: string]: CellDataType }) => {
    console.log('data update', data);
    this.fetchComputations(JSON.stringify(data).replace(/\//g, '!'))
      .then((res: { result: { [key: string]: CellDataType } }) => {
        console.log(res.result);
        this.setState({
          data: res.result
        });
      })
      .catch(error => {
        console.log('error', error);
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