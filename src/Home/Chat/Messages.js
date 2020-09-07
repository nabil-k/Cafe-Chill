import React from 'react';

class Messages extends React.Component{

    chatSocket;

    constructor(props){
        super(props);
        this.chatSocket = this.props.chatSocket;

        this.state = {
            message: null
        };
        
        this.chatSocket.onmessage = function(e){
            const data = JSON.parse(e.data);
            console.log(data.message);
        };

        this.chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };
    }

    render(){
        return(<p>chat</p>);
    }
}

export default Messages;