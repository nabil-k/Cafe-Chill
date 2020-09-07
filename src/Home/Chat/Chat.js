import React from 'react';
import "./Chat.css";
import Messages from './Messages';

class Chat extends React.Component{
    constructor(props){
        super(props);
        
    }

    // Sends chat message
    sendMessage(chatSocket){
        const message = document.getElementById('chat_input').value;
        console.log(message)
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        // Clears input field after message sent
        document.getElementById('chat_input').value = ""
    }

    render(){
        // Connects to chat
        const chatSocket = new WebSocket('ws://localhost:8000/ws/chat/');

        return(
            <div id="chat_container">
                <div id="chat_box">
                    <div id="chat_messageContainer">
                        <Messages chatSocket={chatSocket} />         
                    </div>
                    <input id="chat_input" type="text"/>
                    <div>
                        <button id="send_button">Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
