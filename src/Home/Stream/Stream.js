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


const play = ({
    spotify_uri,
    starting_pos,
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

function initPlayer(){
    
    window.onSpotifyWebPlaybackSDKReady = () =>{
        // Gets spotify access token
        fetch('http://127.0.0.1:8000/spotify/accessToken?format=json', {method:"GET"})
        .then(response => {
            var responseJSON = response.json()
            console.log(responseJSON)
            return responseJSON
        })
        .then(response_access_token =>{
            const access_token = response_access_token.access_token
            const player = new window.Spotify.Player({
                name:'Web Playback SDK Player',
                getOAuthToken: cb => {cb(access_token)}
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message)});
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                
                fetch('http://127.0.0.1:8000/spotify/playlist',{method:'GET'})
                .then(response =>{
                    return response.json()
                })
                .then(playlist=> {
                    var play_position = playlist.play_position
                    var starting_track_uri = playlist.track_batches[play_position.batches_index].items[play_position.track_index].track.uri
                    console.log(starting_track_uri)
                    var starting_pos = Math.round(play_position.track_play_position * 1000)
                    
                    play({
                        playerInstance: player,
                        spotify_uri: starting_track_uri,
                    })
                    
                    var startedPlaylist = true;
                    player.addListener('player_state_changed', state => { 
                        console.log(state)
                        if(startedPlaylist){
                            player.seek(starting_pos).then(()=>{
                                console.log("CHANGED POS");
                                console.log(starting_pos);
                                player.getCurrentState().then(playerState =>{
                                    if(playerState.position >= starting_pos){
                                        startedPlaylist = false;
                                    }
                                })
                                // startedPlaylist = false;
                            })
                        }
                    });
                })



            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.connect().then(success => {
                if(success){
                    console.log("Player Connected")
                }
            })
            console.log(player)
            //"spotify:track:0K5csd4qfsfVQxm0er12C7"
        })
        .catch(error =>{
            console.log(`Failed to get Spotify Access Token ${error}`)
        })

    }
}



export default Stream;
