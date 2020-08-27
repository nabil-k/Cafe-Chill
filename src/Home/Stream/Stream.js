import React from 'react';
import queryString from 'query-string'
import './Stream.css';
import playButtonImg from '../../assets/play_button.png'
import pauseButtonImg from '../../assets/pause_button.png'

class Stream extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            player: null,
            current_track_name: null,
            current_track_artists: null,
            current_track_image: null,
            current_track_volume: null,
            toggledPlay: false
        }
        
        this.togglePlay = this.togglePlay.bind(this)
        this.adjustVolume = this.adjustVolume.bind(this)
        this.startPlayer = this.startPlayer.bind(this)
        
    }
    
    // Spotify play function
    play ({
        spotify_uri,
        starting_pos,
        playerInstance:{
            _options:{
                getOAuthToken,
                id
            }
        }
    }){
        getOAuthToken(token =>{
            console.log(token); // probably need to get new one here too
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`,{
                method:'PUT',
                body: JSON.stringify({uris:[spotify_uri]}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .catch(error =>{
                console.log(error)
            })
        });
    };
    

    startPlayer(){
        
        // Gets spotify access token
        let code = queryString.parse(this.props.location.search).code
        let refresh_token = localStorage.getItem('refresh_token');
        fetch(`http://127.0.0.1:8000/spotify/accessToken?format=json&code=${code}&refresh_token=${refresh_token}`, {
            method:'GET', 
            credentials: 'include',
        })
        .then(response => {
            var responseJSON = response.json();
            console.log("HERE");
            console.log(responseJSON);
            
            return responseJSON;
        })
        .then(response_access_token =>{
            var access_token = response_access_token.access_token;
            localStorage.setItem('token_creation_time', response_access_token.token_creation_time)
            localStorage.setItem('refresh_token', response_access_token.refresh_token)
            const player = new window.Spotify.Player({
                name:'Web Playback SDK Player',
                getOAuthToken: cb => {
                    
                    var date = new Date();
                    var tokenTimeLeft = (date.getTime() - localStorage.getItem('token_creation_time')) / 1000;
                    console.log(tokenTimeLeft);
                    // Creates and uses a new token every 40 minutes (2700 sec)
                    if(tokenTimeLeft >= 2700){
                        console.log("IF");
                        fetch(`http://127.0.0.1:8000/spotify/accessToken?format=json&code=${code}&refresh_token=${refresh_token}`, {method:'GET', credentials: 'include'})
                        
                        .then(response => {
                            var responseJSON = response.json();
                            console.log("HERE");
                            console.log(responseJSON);
                            return responseJSON;
                        })
                        .then(refreshed_access_token =>{
                            access_token = refreshed_access_token.access_token;
                            localStorage.setItem('token_creation_time', refreshed_access_token.token_creation_time)
                            localStorage.setItem('refresh_token', refreshed_access_token.refresh_token)
                            cb(access_token)
                        })
                    }else{
                        console.log("ELSE")
                        cb(access_token)
                    };
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
                    var playlist = playlistBatches.track_batches[0].items;

                    // Combines batches from the response above if need be
                    if( (playlistBatches.track_batches).length >= 2 ){
                        var batch_index;
                        for(batch_index = 1; batch_index < (playlistBatches.track_batches).length; batch_index++){
                            playlist =playlist.concat(playlistBatches.track_batches[batch_index].items);
                        }
                    }

                    var play_position = playlistBatches.play_position;
                    var track_index = (play_position.batches_index * 100) + play_position.track_index;
                    var track = playlist[track_index].track;
                    var starting_pos = Math.round(play_position.track_play_position * 1000);
                    
                    this.play({
                        playerInstance: player,
                        spotify_uri: track.uri,
                    })

                    player.getVolume().then(volume => {
                        this.setState({
                            player: player,
                            current_track_name: track.name,
                            current_track_artists:
                            (track.artists).map( (artist) =>
                                    <span>{artist.name}</span>
                             ),
                            current_track_image: track.album.images[0].url,
                            current_track_volume: volume
                        })
                    })

                    
                    var startedPlaylist = true;
                    var changedTrack = false;
                    player.addListener('player_state_changed', state => { 
                        console.log(state)
                        // Sets where the track should begin playing
                        if(startedPlaylist){
                            console.log("setting time..")
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
                            if(state){
                                if(state.position > 0){
                                    changedTrack = false;
                                }
                                if(state.paused && (state.position === 0)){
                                    if(!changedTrack){
                                        track_index++; 
                                        if(track_index === playlist.length){
                                            track_index = 0;
                                        }
    
                                        console.log(`New Track Index: ${track_index}`)
    
                                        track = playlist[track_index].track
                                        this.play({
                                            playerInstance: player,
                                            spotify_uri: track.uri,
                                        })
                                        
                                        this.setState({
                                            current_track_name: track.name,
                                            current_track_artists:
                                            (track.artists).map( (artist, index) =>
                                                    <span>{ (index ? ', ':'') + artist.name}</span>
                                             ),
                                            current_track_image: track.album.images[0].url,
                                        })

                                        changedTrack = true;
                                    }
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
    
    componentWillMount(){
        this.startPlayer();
    }

    componentWillUnmount(){
        this.state.player.disconnect();
        console.log("CLOSE?");
    }

    // Handles toggling pause/play
    togglePlay(){
        this.setState({
            toggledPlay: !(this.state.toggledPlay)
        })

        this.state.player.togglePlay().then().catch(error => {
            console.error(error)
        })

    }

    // Adjusts player volume
    adjustVolume(event){
        var newVolume = event.target.value / 100;
        this.setState({
            volume: newVolume
        })
        this.state.player.setVolume(this.state.volume).then(() => {
            console.log('Volume updated: ' + this.state.volume);
        });
    }
    
    render(){
        return(
            <div id="streamContainer">
                <div id="playback_image_container" >
                    <div id="playback_image_background" style={ {backgroundImage:`url(${this.state.current_track_image})`} }></div>
                    <img id="playback_image" src={this.state.current_track_image} width="640" height="640"/>
                </div>
                <div id="playbackControlsContainer">
                    <div className="playback_controls">
                        <div id="trackInfo">
                            <p>Track: {this.state.current_track_name}</p>
                            <p>Artist: {this.state.current_track_artists}</p>
                        </div>
                    </div>
                    <div className="playback_controls">
                        <div id="togglePlayButton" onClick={this.togglePlay}>
                            <img src={ this.state.toggledPlay ?  playButtonImg:pauseButtonImg } width="64" height="64"/>
                        </div>
                    </div>
                    <div className="playback_controls">
                        <div id="volumeSliderContainer">
                            <input type="range" min="0" max="100" value={this.state.volume * 100} onChange={this.adjustVolume} step="1"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stream;
