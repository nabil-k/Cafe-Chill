import React from 'react';
import "./Home.css";
import Stream from './Stream/Stream';
import Chat from './Chat/Chat';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
    }
    render(){ 
        return(
            <div id="container">
                <Chat id="chatContainer"/> 
                <Stream id="streamContainer" location={this.props.location}/>
            </div>
        );
    }
}

export default Home;
