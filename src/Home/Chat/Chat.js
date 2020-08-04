import React from 'react';
import "./Chat.css";

class Chat extends React.Component{
    constructor(props){
        super(props);
    }

    render(){ 
        return(
            <div id="chat_container">
                <div id="chat_box">
                    <div>
                        <p>Hamzah: UGH</p>
                        <p>Bob: POOF</p>
                        <p>nipkip: yeet</p>               
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
