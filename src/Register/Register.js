import React from 'react';
import "./Register.css";

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


    register(){
        console.log(this.state)
    }

    setEmail(event){
        var email_input = event.target.value;
        var email_valid = (email_input.includes("@") && (email_input.indexOf(".") > email_input.indexOf("@")) && (email_input.indexOf(".") < email_input.length - 1)); 

        this.setState({
            email: email_input
        })
    
        if(!email_valid){
            console.log("Email isn't valid")
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
                    console.log("PASSWORDS DONT MATCH")
                }
            }
        );


    }

    render(){
        return(
   
            <div id="formContainer">
                <div id="inputContainer">
                    <form onSubmit={this.register}>
                        <input type="text" value={this.state.email} onChange={this.setEmail} placeholder="Email"/>
                        <input type="text" value={this.state.display_name} onChange={this.setDisplayName} placeholder="Display Name"/>
                        <input type="text" value={this.state.password} onChange={this.setPassword} placeholder="Password"/>
                        <input type="text" value={this.state.confirm_password} onChange={this.setPasswordConfirmed} placeholder="Confirm Password"/>
                        <input type="submit" value="Register"/>
                    </form>
                </div>
            </div>

        )
    }
}

export default Register;