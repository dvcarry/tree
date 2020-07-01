import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { TreeComp } from './components/Tree';
import { Catalog } from './components/Catalog';

function App() {
  return (
    <div className="App">
      <TreeComp />
      <Catalog />
    </div>
  );
}

export default App;
