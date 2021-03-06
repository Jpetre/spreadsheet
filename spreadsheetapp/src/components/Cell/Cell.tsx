import React, { useState, useContext } from 'react';
import './Cell.scss';
import { SpreadSheetContext } from '../../store/SpreadSheetContext';
import { CellType, ColumnDataType, SpreadSheetContextType } from '../../../../types/types';

interface CellProps extends CellType { }

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const context: SpreadSheetContextType = useContext(SpreadSheetContext);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.x > 0 && props.y > 0 ? context.data[props.x][props.y].inputValue : '');

  const updateContext = (value: string) => {
    const updatedData: ColumnDataType = context.data;
    updatedData[props.x][props.y].inputValue = value;
    updatedData[props.x][props.y].value = value;
    context.updateData(updatedData);
  };

  const handleClick = () => {
    setEditing(true);
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing(false);
    updateContext(e.target.value);
  };

  const onKeyPressOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditing(false);
      updateContext((e.target as HTMLInputElement).value);
    };
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // header row
  if (props.x === 0) {
    return (
      <div className='Cell Cell--info'>
        {props.y}
      </div>
    )
  };
  // header column
  if (props.y === 0) {
    const alphabet = ' abcdefghijklmnopqrstuvwxyz'.split('');
    return (
      <div
        className='Cell Cell--info'>
        {alphabet[props.x]}
      </div>
    )
  };

  if (editing) {
    return (
      <input
        className='Cell'
        type='text'
        value={inputValue}
        onBlur={onBlur}
        onKeyPress={onKeyPressOnInput}
        onChange={onChange}
        autoFocus
      />
    )
  }

  return (
    <div
      className='Cell'
      onClick={() => handleClick()}
    >
      {context.data[props.x][props.y].value}
    </div>
  )
}

export default Cell;