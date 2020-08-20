import React from 'react';
import "./Login.css";

class Login extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
   
            <div id="formContainer">
                <div id="inputContainer">
                    <input type="text" placeholder="Username"/>
                    <input type="text" placeholder="Password"/>
                    <button>Login</button>
                </div>
            </div>

        )
    }
}

export default Login;