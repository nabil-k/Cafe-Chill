import React from 'react';
import "./Chat.css";

class Input extends React.Component{

    chatSocket;

    constructor(props){
        super(props);
        this.chatSocket = this.props.chatSocket;

        this.state = {
            input_message: ""
        };
        
        this.setInputMessage = this.setInputMessage.bind(this);  
        this.keyPress = this.keyPress.bind(this); 
    }

    // Sends chat message
    sendMessage(chatSocket){
        const message = this.state.input_message;
        console.log(this.chatSocket.readyState);
        console.log(message)
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        // Clears input field after message sent
        this.setState({
            input_message: ""
        })
    }

    setInputMessage(event){
        this.setState({
            input_message: event.target.value
        })
    }

    keyPress(event){
        if(event.keyCode == 13){
            this.sendMessage(this.chatSocket)
        }
    }

    render(){
        let userLoggedIn = false
        console.log(this.props.displayName)
        if(this.props.displayName){
            userLoggedIn = true
        }
        console.log(userLoggedIn)

        return(
            <div>
                <input id="chat_input" value={this.state.input_message} onKeyDown={this.keyPress} onChange={this.setInputMessage} placeholder="Say Something... :)" type="text"  disabled={!userLoggedIn}/>
                <div>
                    <button onClick={ ()=> this.sendMessage(this.chatSocket) } id="send_button"  disabled={!userLoggedIn}>Send</button>
                </div>
                {!userLoggedIn &&
                    <div id="loginToChatMessage">
                        <span>Chat disabled until you login 😢</span>
                    </div>
                }
            </div>
        );
    }
}

export default Input;