import React from 'react';
import './App.scss';
import Table from './components/Table/Table';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1 className='App__title'>SpreadSheet</h1>
      <Table x={6} y={4} />
    </div>
  );
}

export default App;
