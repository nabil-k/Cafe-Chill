import React from 'react';
import "./Stream.css";

class Stream extends React.Component{

    constructor(props){
        super(props);
        initPlayer();
    }

    render(){ 
        return(
            <div >
                <p>test</p>
            </div>
        );
    }
}

function initPlayer(){
    window.onSpotifyWebPlaybackSDKReady = () =>{
        const token = 'BQAODpsGwn3pw7M-qxwMw3To9MkE4wwxJqiczAZwF5sFMxl3c17Hk1_okwKT5vNTxBu9tszEEjqQ-jdNZEKgf4krSSRtn5rWHu8aieTO_T2d4LRZbKlYfRU7567wa_f-Jh-QwUn9ukhZMX-SjxERCvBFP21Sqh5-iRKUgSILwhuPQ8S1ZPgZD04';
        
        const player = new window.Spotify.Player({
            name:'Web Playback SDK Player',
            getOAuthToken: cb => {cb(token)}
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message)});
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            const play = ({
                spotify_uri,
                playerInstance:{
                    _options:{
                        getOAuthToken,
                        id
                    }
                }
            }) => {
                getOAuthToken(token =>{
                    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`,{
                        method:'PUT',
                        body: JSON.stringify({uris:[spotify_uri]}),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                });
            };
    
            play({
                playerInstance: player,
                spotify_uri: "spotify:track:0K5csd4qfsfVQxm0er12C7",
            })
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        player.connect().then(success => {
            if(success){
                
            }
        })
        console.log(player)
        //"spotify:track:0K5csd4qfsfVQxm0er12C7"

    }
}

export default Stream;
