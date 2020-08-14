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
import Register from './Register/Register';

function App() {
    return (
        <div> 
            <Router>
                <Menu />
                <Switch id="switch">
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
