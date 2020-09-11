import React from 'react';
import './Chat.css';
import Messages from './Messages';
import Input from './Input';
import Cookie from 'js-cookie'

class Chat extends React.Component{
    constructor(props){
        super(props);   
    }



    render(){
        // Connects to chat
        var accessToken = Cookie.get("jwt");
        let chatSocket = new WebSocket("ws://localhost:8000/ws/chat/" + accessToken + "/");

        return(
            <div id="chat_container">
                <div id="chat_box">
                    <div id="chat_messageContainer">
                        <Messages chatSocket={chatSocket} />         
                    </div>
                    <div id="chat_inputContainer">
                        <Input chatSocket={chatSocket} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
