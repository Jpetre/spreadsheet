import React from 'react';
import './App.scss';
import Table from './components/Table/Table';

const handleClearStorage = () => {
  if (window && window.localStorage) {
    window.localStorage.clear();
  }
}

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1 className='App__title'>SpreadSheet</h1>
      <Table x={6} y={4} id={'1'} />
      <button className='App__resetButton' onClick={() => handleClearStorage()}>Clear localStorage</button>
    </div>
  );
}

export default App;
