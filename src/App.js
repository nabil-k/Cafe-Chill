import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Profile from './Profile/Profile';

function App() {
  return (
      <Router>
        <Menu />
        <Switch id="switch">
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
  

  );
}

export default App;
