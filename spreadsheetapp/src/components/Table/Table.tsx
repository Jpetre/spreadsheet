import React from 'react';
import { env } from '../../config/config';
import Row from '../Row/Row';
import { SpreadSheetContext } from '../../store/SpreadSheetContext';
import { ColumnDataType } from '../../../../types/types';

type TableProps = {
  x: number;
  y: number;
  id: string;
};

type TableState = {
  data: ColumnDataType;
};

export default class Table extends React.PureComponent<TableProps, TableState> {
  tableId: string;
  constructor(props: TableProps) {
    super(props);
    this.tableId = `tableData-${props.id}`;
    let data: ColumnDataType = {};
    if (window && window.localStorage && window.localStorage.getItem(this.tableId)) {
      const storage = window.localStorage.getItem(this.tableId);
      if (storage) data = JSON.parse(storage);
    }
    else {
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
    }

    this.state = {
      data,
    }
  };

  fetchComputations = (computations: string) =>
    fetch(`${env.API}${computations}`)
      .then(res => res.json());

  updateData = (data: ColumnDataType) => {
    console.log('data update', data);
    this.fetchComputations(JSON.stringify(data).replace(/\//g, '!'))
      .then((res: { result: ColumnDataType }) => {
        console.log(res.result);
        if (window && window.localStorage) {
          window.localStorage.setItem(this.tableId, JSON.stringify(res.result).replace(/!/g, '/'));
        }
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