import React from 'react';
import './Chat.css';
import Messages from './Messages';
import Input from './Input';

class Chat extends React.Component{
    constructor(props){
        super(props);   
    }



    render(){
        // Connects to chat
        let chatSocket = new WebSocket('ws://localhost:8000/ws/chat/');

        return(
            <div id="chat_container">
                <div id="chat_box">
                    <div id="chat_messageContainer">
                        <Messages chatSocket={chatSocket} />         
                    </div>
                    <Input chatSocket={chatSocket} />
                </div>
            </div>
        );
    }
}

export default Chat;
