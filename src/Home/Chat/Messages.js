import React from 'react';
import './Message.css'

class Messages extends React.Component{

    chatSocket;

    constructor(props){
        super(props);
        
        this.state = {
            messages: []
        }

        this.chatSocket = this.props.chatSocket;
        this.updateMessages = this.updateMessages.bind(this);

        this.chatSocket.onmessage = (e) =>{
            const data = JSON.parse(e.data);
            const message = data;
            console.log(message);
            this.updateMessages(message);
        };

        this.chatSocket.onclose = (e) => {
            console.error('Chat socket closed unexpectedly');
        };
    }

    updateMessages(message){
        let messages_updated = this.state.messages.concat(message)
        this.setState({
            messages: messages_updated
        })
    }
    

    render(){
        
        let messages = this.state.messages.map((item, index) =>
            <div key={index} className="message_container">
                <div className="message_userName">
                    {item.username}: {item.message}
                </div>
            </div>
        );

        return(
            <div>
                { messages }
            </div>
        );
    }
}

export default Messages;