import React from 'react';
import Row from './Row';
import renderer from 'react-test-renderer';
import { SpreadSheetContext } from '../../store/SpreadSheetContext';
import mockData from '../../mocks/data.json';

test('Row render correctly', () => {
  const component = renderer.create(
    <SpreadSheetContext.Provider
      value={{
        data: mockData
      }}
    >
      <Row 
        x={6} 
        y={1} 
      />
    </SpreadSheetContext.Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});