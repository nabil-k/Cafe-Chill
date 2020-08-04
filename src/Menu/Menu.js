import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import "./Menu.css";

class Menu extends React.Component{
    render(){
        return(
            <nav id="menu">
                <h1 id="menu_title">
                    <Link to="/">Cafe-Chill</Link> 
                </h1>
            </nav>
        );
    }
}

export default Menu;