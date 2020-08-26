import React from 'react';
import "./Login.css";
import Cookie from 'js-cookie'
import cafeLogo from '../assets/server-icon.svg'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:""
        };

        this.login =  this.login.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    setEmail(event){
        var email_input = event.target.value;
        var email_valid = (email_input.includes("@") && (email_input.indexOf(".") > email_input.indexOf("@")) && (email_input.indexOf(".") < email_input.length - 1)); 

        this.setState({
            email: email_input
        })
    
        if(!email_valid){
            console.log("Email isn't valid");
        }
    }

    setPassword(event){
        this.setState({
            password: event.target.value
        })
    }

    login(event){
        event.preventDefault();
        
        fetch('http://127.0.0.1:8000/website/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(this.state)
        })
        .then(response => {
            return response.json();
        })
        .then(data =>{
            Cookie.set('jwt',data.jwt);
            console.log(this.props)
            this.props.handler();
            this.props.history.push('/authorize');
            
        })
       
    }

    render(){
        return(
   
            <div id="loginFormContainer">
                <div id="loginInputContainer">
                    <form id="loginForm" onSubmit={this.login}>
                        <img src={cafeLogo} width="100" height="100"/>
                        <input className="registerInput" type="email" value={this.state.email} onChange={this.setEmail} placeholder="Email"/>
                        <input className="registerInput" type="password" value={this.state.password} onChange={this.setPassword} placeholder="Password"/>
                        <input className="registerInput" type="submit" id="registerFormButton" value="Login"/>
                    </form>
                </div>
            </div>

        )
    }
}

export default Login;