import React from 'react';
import "./Stream.css";

class Stream extends React.Component{

    constructor(props){
        super(props);
        startPlayer();
    }

    render(){ 
        return(
            <div id="steamContainer">
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
        console.log(token); // probably need to get new one here too
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

function startPlayer(){
    
    window.onSpotifyWebPlaybackSDKReady = () =>{
        // Gets spotify access token
        var starting_date = new Date();
        var tokenStartTime = starting_date.getTime();
        fetch('http://127.0.0.1:8000/spotify/accessToken?format=json', {method:"GET"})
        .then(response => {
            var responseJSON = response.json()
            console.log(responseJSON)
            return responseJSON
        })
        .then(response_access_token =>{
            var access_token = response_access_token.access_token
            const player = new window.Spotify.Player({
                name:'Web Playback SDK Player',
                getOAuthToken: cb => {
                    console.log(tokenStartTime)
                    var date = new Date();
                    var timeSinceTokenCreated = date.getTime() - tokenStartTime;
                    console.log(date.getTime())
                    console.log(timeSinceTokenCreated / 1000)
                    // Creates and uses a new token every 40 minutes
                    if(timeSinceTokenCreated >= 40 * 60000){
                        console.log("IF")
                        fetch('http://127.0.0.1:8000/spotify/accessToken?format=json', {method:"GET"})
                        .then(response => {
                            var responseJSON = response.json()
                            console.log(responseJSON)
                            return responseJSON
                        })
                        .then(refreshed_access_token =>{
                            access_token = refreshed_access_token.access_token
                            cb(access_token)
                            tokenStartTime = date.getTime();
                        })
                    }else{
                        console.log("ELSE")
                        cb(access_token)
                    }

                }
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
                .then(playlistBatches => {
                    var playlist = playlistBatches.track_batches[0].items

                    // Combines batches from the response above if need be
                    if( (playlistBatches.track_batches).length >= 2 ){
                        var batch_index;
                        for(batch_index = 1; batch_index < (playlistBatches.track_batches).length; batch_index++){
                            playlist =playlist.concat(playlistBatches.track_batches[batch_index].items)
                        }
                    }

                    var play_position = playlistBatches.play_position
                    var track_index = (play_position.batches_index * 100) + play_position.track_index
                    var track = playlist[track_index].track
                    var starting_pos = Math.round(play_position.track_play_position * 1000)
                    play({
                        playerInstance: player,
                        spotify_uri: track.uri,
                    })
                    
                    var startedPlaylist = true;
                    var changedTrack = false;
                    player.addListener('player_state_changed', state => { 
                        console.log(state)
                        // Sets where the track should begin playing
                        if(startedPlaylist){
                            player.seek(starting_pos).then(()=>{
                                player.getCurrentState().then(playerState =>{
                                    if(playerState.position >= starting_pos){
                                        startedPlaylist = false;
                                    }
                                })
                                
                            })
                        }
                        // Moves to next track once the current track is done
                        else{
                            if(state.position > 0){
                                changedTrack = false;
                            }
                            if(state.paused && (state.position == 0)){
                                if(!changedTrack){
                                    track_index++; 
                                    if(track_index == playlist.length){
                                        track_index = 0;
                                    }

                                    console.log(`New Track Index: ${track_index}`)

                                    track = playlist[track_index].track
                                    play({
                                        playerInstance: player,
                                        spotify_uri: track.uri,
                                    })
                                    changedTrack = true;
                                }
                            }
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
