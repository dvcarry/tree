import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Main } from './components/Main';
import { SelectProject } from './components/SelectProject/Projects/SelectProject';
import { Route, Switch } from 'react-router-dom';
import { Menu } from './components/Menu/Menu';

function App() {

  return (
    <>
      <Menu />
      <Switch>
        <Route exact path='/' component={SelectProject} />
        <Route path='/:project_id' component={Main} />
      </Switch>
    </>
  );
}

export default App;
