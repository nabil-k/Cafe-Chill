import React from 'react';
import './Chat.css';
import Messages from './Messages';
import Input from './Input';
import Cookie from 'js-cookie'

class Chat extends React.Component{
    constructor(props){
        super(props);
        // Connects to chat
        let accessToken = Cookie.get("jwt");
        let chatSocket = new WebSocket("ws://localhost:8000/ws/chat/" + accessToken + "/");
        
        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        this.state = {
            chatSocket: chatSocket
        }

    }



    render(){

        return(
            <div id="chat_container">
                <div id="chat_box">
                    <div id="chat_messageContainer">
                        <Messages chatSocket={this.state.chatSocket} />         
                    </div>
                    <div id="chat_inputContainer">
                        <Input displayName={this.props.displayName} chatSocket={this.state.chatSocket} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
