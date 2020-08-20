import React from 'react';
import {
    Link
  } from "react-router-dom";

import "./Menu.css";

class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            spotify_auth: (localStorage.getItem('refresh_token') !== null)
        }
    }
    render(){
        return(
            <nav id="menu">
                <h1 id="menu_title">
                    <Link id="menu_title_text" to= {this.state.spotify_auth ? '/home' : '/authorize'} style={{ textDecoration: 'none'}}>Cafe-Chill</Link> 
                </h1>
                <Link to='/login'>
                    <button id="loginButton">
                        Login
                    </button>
                </Link>
                <Link to='/register'>
                    <button id="registerButton">
                        Register
                    </button>
                </Link>
            </nav>
        );
    }
}

export default Menu;