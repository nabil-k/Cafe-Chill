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
                    <Link id="menu_title_text" to="/" style={{ textDecoration: 'none'}}>Cafe-Chill</Link> 
                </h1>
                <button id="login_register_button">
                    Login/Register
                </button>
            </nav>
        );
    }
}

export default Menu;