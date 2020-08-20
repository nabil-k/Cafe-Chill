import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import './App.css';
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Profile from './Profile/Profile';
import Authorize from './Authorize/Authorize';
import Register from './Register/Register';

function App() {
    return (
        <Router>
            <Menu/>
            <Switch id="switch">
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/home" component={Home} />
                <Route path="/authorize">
                    <Authorize/>
                </Route>
                <Route exact path="/">
                    <Redirect to="/authorize" />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
