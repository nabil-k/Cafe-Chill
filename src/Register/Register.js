import React from 'react';
import "./Register.css";

class Register extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
   
            <div id="formContainer">
                <div id="inputContainer">
                    <input type="text" placeholder="Username"/>
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Password"/>
                    <input type="text" placeholder="Confirm Password"/>
                    <button>Register</button>
                </div>
            </div>

        )
    }
}

export default Register;