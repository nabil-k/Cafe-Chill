import React from 'react';
import { Link } from "react-router-dom";
import Cookie from 'js-cookie'
import "./Menu.css";

class Menu extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            spotify_auth: (localStorage.getItem('refresh_token') !== null),
            display_name: this.props.displayName
        }

        this.logOut = this.logOut.bind(this);
        
    }

    componentDidUpdate(prevProps){
        if(prevProps.displayName != this.props.displayName){
            this.setState({
                display_name: this.props.displayName
            })
        }
    }

    logOut(){
        Cookie.remove('jwt');
        this.setState({
            display_name: null
        })
        this.props.handler(true);
    }

    render(){
        console.log(this.props.displayName);
        let loggedInName = this.state.display_name;
        let buttons;
        console.log(loggedInName)
        if(loggedInName){
            buttons = 
            <div className="logContainer">
                <span id="displayName">{loggedInName}</span>
                <button onClick={this.logOut} id="logOutButton">Log Out</button>    
            </div>

        }
        else{
            buttons = 
            <div className="logContainer">
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
            </div>
        }

        return(
            <nav id="menu">
                <h1 id="menu_title">
                    <Link id="menu_title_text" to= {this.state.spotify_auth ? '/home' : '/authorize'} style={{ textDecoration: 'none'}}>Cafe-Chill</Link> 
                </h1>
                {buttons}
            </nav>
        );
    }
}

export default Menu;