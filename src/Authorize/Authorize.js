import React from 'react';
import './Authorize.css';
import backgroundImg from '../assets/cafe.jpg'

class Authorize extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="container">
                <div id="backgroundImage" style={ {backgroundImage: `url(${backgroundImg}` } }></div>
                <div id="header">
                    <h1 id="authorizeWelcomeHeader">Welcome! Connect your Spotify premium account to get started.</h1>
                    <div id="authorizeButtonContainer">
                        <a id="spotifyAuthLink" href="https://accounts.spotify.com/authorize?client_id=009bc2be12a74b61b3c73256c1b2dc49&response_type=code&scope=streaming%20user-read-email%20user-read-private&redirect_uri=http://localhost:3000/home">
                            <div id="authorizeButton">
                                Connect Spotify
                            </div> 
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Authorize;