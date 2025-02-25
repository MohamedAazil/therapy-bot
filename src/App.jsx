import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import MainContent from './Components/MainContent/MainContent';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <MainContent/>
    </div>
  );
};

export default App;
