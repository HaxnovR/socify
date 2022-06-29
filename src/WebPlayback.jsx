import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';


const track = {
    name: "",
    image: "",
    artists: [
        { name: "" }
    ]
}

const userinfo = {
    name: "",
    image: "",
    url: "",
    premium: false
}

const WebPlayback = (props) => {
    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(props.token);
    spotifyApi.setRefreshToken(props.refresh);

    // To Load Current Playing Data as soon as page is loaded
    // DO NOT ADD OTHER FUNCTIONS
    // Reloads every 1 second to refresh current track
    useEffect(() => {
        console.log("ACCESS TOKEN SET!!");
        const interval = setInterval(() => {
            getCurrentlyPlaying();
            spotifyApi.getMyCurrentPlaybackState().then(function(data) {
                if (data.body && data.body.is_playing) {
                    setPaused(false);
                } else {
                    setPaused(true);
                }
            });
          }, 1000);
          spotifyApi.getMyRecentlyPlayedTracks({
            limit : 1
          }).then(function(data) {
              let temp = data.body.items[0].track;
              track.name = temp.name;
              track.image = temp.album.images[0].url;
              track.artists[0].name = temp.artists[0].name;
            }, function(err) {
              console.log('Something went wrong!', err);
            });
          return () => clearInterval(interval);
    }, [])
    

    // Initialize Spotify Api using token from props (App.js)

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'SOCIFY',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();

        };
    }, []);

    useEffect(() => {
        getUserinfo();
    }, []);
    async function getUserinfo(){
        spotifyApi.getMe().then(function(data) {
            let temp = data.body;
            userinfo.name = temp.display_name;
            userinfo.image = temp.images[0].url;
            userinfo.url = temp.external_urls.spotify;
            if(temp.product === 'premium')userinfo.premium=true;
        });
        // spotifyApi.refreshAccessToken().then(function(data) {
        //       console.log('The access token has been refreshed!');
        //     }
        // );
    }
    async function setPlayPause(){
        spotifyApi.getMyCurrentPlaybackState().then(function(data) {
            if (data.body && data.body.is_playing) {
            spotifyApi.pause().then(function() {
                setPaused(true);
            });
            } else {
            spotifyApi.play().then(function() {
                setPaused(false);
            });
            }
        });
    }
    async function setNext(){
        spotifyApi.skipToNext();
    }
    async function setPrevious(){
        spotifyApi.skipToPrevious();
    }
    async function getCurrentlyPlaying(){
        spotifyApi.getMyCurrentPlayingTrack()
        .then(function(data) {
            setTrack(
                {
                name: data.body.item.name,
                image: data.body.item.album.images[0].url,
                artists: [
                    { name: data.body.item.artists[0] }
                ]
            })
        },
        function(err){
            console.log(err);
        });
    }
    return (
        <>
            <div className='Username'>
                <img src={userinfo.image} alt='' width='40px'/>
                <a href={userinfo.url} target="_blank" rel="noopener noreferrer">{userinfo.name}</a>
            </div>
            <div className="player">
                <div className="main-wrapper">
                    <img src={current_track.image} className="now-playing-cover" alt="Cover Art" />
                    <div className="now-playing-side">
                        <div className="now-playing__name">{current_track.name}</div>
                        <div className="now-playing__artist">{current_track.artists[0].name.name}</div>
                        <button className="btn-back" onClick={() => { setPrevious() }} >
                        </button>
                        <button className='def-btn' onClick={setPlayPause} >
                            { is_paused ? <div className='btn-play'/> : <div className='btn-pause'/> }
                        </button>
                        <button className="btn-forward" onClick={() => { setNext() }} >
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebPlayback
