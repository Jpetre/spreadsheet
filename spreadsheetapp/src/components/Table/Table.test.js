import React from 'react';
import Table from './Table';
import renderer from 'react-test-renderer';

test('Table render correctly', () => {
  const component = renderer.create(
    <Table x={6} y={6} id={'1'} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});