import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
let username = '';


const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}



function WebPlayback(props) {

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(props.token);

    // const getName = async () => {
    //     let data = await spotifyApi.getMe();
    //     return data.body.display_name;
    // }

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
                name: 'Web Playback SDK',
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

    if (!is_active) { 
        return (
            <>
                <div className="App">
                   <header className="flex">
                       <h1 className='Logo'>Socify.</h1>
                       <nav className="head">
                           <a className='Button' href="/explore">Home</a>
                           <a className='Button' href="/explore">Listen along</a>
                           <a className='Button' href="/explore">Explore</a>
                           <a className='Button' href="/Lobbies">Lobbies</a>
                       </nav>
                       <div className="search">
                           <input type="text" id="search" placeholder="Search"/>
                       </div>
                   </header>
  
                <div className="welcome">
                     <h1 className='intro'>Welcome to Socify</h1>
                     <a className="login" href="/Start">Start Session</a>
                </div>
                <div className='limitHeight'>
                   <div className="vid_contain"></div>
                </div>
                </div>
                <div className="player">
                    <div className="main-wrapper now-playing-side">No Instance Found. Start Instance from another Spotify Player</div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="App">
                   <header className="flex">
                       <h1 className='Logo'>Socify.</h1>
                       <nav className="head">
                           <a className='Button' href="/explore">Home</a>
                           <a className='Button' href="/explore">Listen along</a>
                           <a className='Button' href="/explore">Explore</a>
                           <a className='Button' href="/Lobbies">Lobbies</a>
                       </nav>
                       <div className="search">
                           <input type="text" id="search" placeholder="Search"/>
                       </div>
                   </header>
  
                 <div className="welcome">
                     <h1 className='intro'>Create Your Session</h1>
                     <a className="login" href="/Start">Start Session</a>
                 </div>
                 <div className='limitHeight'>
                   <div className="vid_contain"></div>
                 </div>

                </div>
                <div className='Username'>Username Here</div>
                <div className="player">
                    <div className="main-wrapper">

                        <img src={current_track.album.images[0].url} className="now-playing-cover" alt="Cover Art" />

                        <div className="now-playing-side">
                            <div className="now-playing__name">{current_track.name}</div>
                            <div className="now-playing__artist">{current_track.artists[0].name}</div>

                            <button className="btn-back" onClick={() => { player.previousTrack() }} >
                            </button>

                            <button className='def-btn' onClick={() => { player.togglePlay() }} >
                                { is_paused ? <div className='btn-play'/> : <div className='btn-pause'/> }
                            </button>

                            <button className="btn-forward" onClick={() => { player.nextTrack() }} >
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback
