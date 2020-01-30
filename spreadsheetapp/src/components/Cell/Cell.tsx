import React, { useState, useContext } from 'react';
import { SpreadSheetContext } from '../Table/Table';
import { CellType, CellDataType, SpreadSheetContextType } from '../../../../types/types';

interface CellProps extends CellType { }

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const context: SpreadSheetContextType = useContext(SpreadSheetContext);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.x > 0 && props.y > 0 ? context.data[props.x][props.y].inputValue : '');

  const updateContext = (value: string) => {
    const updatedData: { [key: string]: CellDataType } = context.data;
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

  // Cant type correctly to have both e.key and e.target.value working (with React.KeyboardEvent<HTMLInputElement>)
  const onKeyPressOnInput = (e: any) => {
    if (e.key === 'Enter') {
      setEditing(false);
      updateContext(e.target.value);
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