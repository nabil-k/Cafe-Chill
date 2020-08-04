import React from 'react';
import "./Home.css";
import Stream from './Stream/Stream';
import Chat from './Chat/Chat';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){ 
        return(
            <div id="container">
                <div id="stream">
                    <Stream/>
                </div>
                <div id="chat_parent_container">
                    <Chat/>
                </div>
            </div>
        );
    }
}

export default Home;
