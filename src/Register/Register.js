import React from 'react';
import './Register.css';
import Cookie from 'js-cookie';
import cafeLogo from '../assets/server-icon.svg'

class Register extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email:"",
            display_name:"",
            password:"",
            password_confirmed:""
        };

        this.register =  this.register.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setDisplayName = this.setDisplayName.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPasswordConfirmed = this.setPasswordConfirmed.bind(this);
    }

    register(event){
        event.preventDefault();
        
        fetch('http://127.0.0.1:8000/website/register', {
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
            this.props.handler(false);
            this.props.history.push('/');
            
        })
       
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

    setDisplayName(event){
        this.setState({
            display_name: event.target.value
        })
    }

    setPassword(event){
        this.setState({
            password: event.target.value
        })
    }

    setPasswordConfirmed(event){
        this.setState({
            password_confirmed: event.target.value
        }, 
        ()=>{
                if(this.state.password !== this.state.password_confirmed){
                    console.log("PASSWORDS DONT MATCH");
                }
            }
        );


    }

    render(){
        return(
            <div id="registerFormContainer">
                <div id="registerInputContainer">
                    <form id="registerForm" onSubmit={this.register}>
                        <img src={cafeLogo} width="100" height="100"/>
                        <input className="registerInput" type="email" value={this.state.email} onChange={this.setEmail} placeholder="Email" required/>
                        <input className="registerInput" type="text" value={this.state.display_name} onChange={this.setDisplayName} placeholder="Display Name" required/>
                        <input className="registerInput" type="password" value={this.state.password} onChange={this.setPassword} placeholder="Password" required/>
                        <input className="registerInput" type="password" value={this.state.confirm_password} onChange={this.setPasswordConfirmed} placeholder="Confirm Password" required/>
                        <input className="registerInput" type="submit" id="registerFormButton" value="Register"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;