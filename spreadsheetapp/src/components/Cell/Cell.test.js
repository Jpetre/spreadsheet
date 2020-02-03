import React from 'react';
import Cell from './Cell';
import renderer from 'react-test-renderer';
import { SpreadSheetContext } from '../../store/SpreadSheetContext';
import mockData from '../../mocks/data.json';

test('Cell render correctly', () => {
  const component = renderer.create(
    <SpreadSheetContext.Provider
      value={{
        data: mockData
      }}
    >
      <Cell 
        y={1}
        x={1}
      />
    </SpreadSheetContext.Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Cell header column render correctly', () => {
  const component = renderer.create(
    <Cell 
      y={0}
      x={1}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Cell header row render correctly', () => {
  const component = renderer.create(
    <Cell 
      y={1}
      x={0}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});