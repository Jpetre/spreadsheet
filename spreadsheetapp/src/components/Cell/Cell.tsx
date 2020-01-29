import React, { useState } from 'react';
import { CellType } from '../../../../types/types';

interface CellProps extends CellType { }

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.inputValue);

  const handleClick = () => {
    setEditing(true);
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing(false);
  };

  // Cant type correctly to have both e.key and e.target.value working (with React.KeyboardEvent<HTMLInputElement>)
  const onKeyPressOnInput = (e: any) => {
    if (e.key === 'Enter') {
      setEditing(false);
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
      {props.value}
    </div>
  )
}

export default Cell;