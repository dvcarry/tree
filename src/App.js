import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { TreeComp } from './components/Tree';
import { Catalog } from './components/Catalog';
import { Description } from './components/Description';





function App() {

  const array = [
    { id: 11, title: 'hello1', type: 'page' },
    { id: 22, title: 'hello2', type: 'page' },
    { id: 33, title: 'hello3', type: 'component'},
    { id: 4, title: 'hello4', type: 'component' },
    { id: 5, title: 'hello5', type: 'component' },
    { id: 6, title: 'hello6', type: 'component' },
    { id: 7, title: 'hello7', type: 'component' },
    { id: 8, title: 'hello8', type: 'component' }
  ]

  console.log(array)

  return (
    <div className="App">
      <TreeComp />
      <Catalog catalog={array} />
      <Description />
    </div>
  );
}

export default App;
