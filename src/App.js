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
import Login from './Login/Login'
import Cookie from 'js-cookie'

class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            display_name: null
        }
        let accessToken = Cookie.get("jwt")
        console.log('accessToken ', accessToken)
        if(accessToken){
            fetch('http://127.0.0.1:8000/website/userDisplayName?accessToken='+accessToken, {
                method: 'GET'
            })
            .then(response => {
                return Response;
            })
            .then(data => {
                console.log(data)
                if(data.code == "200"){
                    let displayName = data.display_name;
                    this.setState({
                        display_name: displayName
                    })
                }

            })
        }

        this.updateMenu = this.updateMenu.bind(this)
    }

    updateMenu(){
        let accessToken = Cookie.get("jwt")
        fetch('http://127.0.0.1:8000/website/userDisplayName?accessToken='+accessToken, {
            method: 'GET'
        })
        .then(response => {
            return Response;
        })
        .then(data => {
            console.log(data)
            let displayName = data.display_name;
            this.setState({
                display_name: displayName
            })
        })
    }

    render(){
        return (
            <Router>
                <Menu displayName={this.state.display_name} />
                <Switch id="switch">
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/register" render={(props)=> <Register history={props.history} handler={this.updateMenu}/> } />
                    <Route path="/login">
                        <Login/>
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

}

export default App;
