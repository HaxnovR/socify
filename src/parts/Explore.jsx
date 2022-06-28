import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const token = localStorage.getItem('AuthCode');


const links = ['1HZlFq0Ebjrvy12Cuw5hQG','5IEX6CpD9ZhUeacEMjMpGP','2znryEij05Rt0UDk9XD7Im'];

const info = {
    name: "",
    image: "",
    url: ""
}

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


const Explore = () => {

    const[pl1,setpl1] = useState(info);
    const[pl2,setpl2] = useState(info);
    const[pl3,setpl3] = useState(info);

    async function getPlaylists() {
        spotifyApi.getPlaylist(links[0]).then(function(data) {
            setpl1(
                {
                name: data.body.name,
                image: data.body.images[0].url,
                url: data.body.external_urls.spotify
            });
        })
        spotifyApi.getPlaylist(links[1]).then(function(data) {
            setpl2(
                {
                name: data.body.name,
                image: data.body.images[0].url,
                url: data.body.external_urls.spotify
            });
        })
        spotifyApi.getPlaylist(links[2]).then(function(data) {
            setpl3(
                {
                name: data.body.name,
                image: data.body.images[0].url,
                url: data.body.external_urls.spotify
            });
        })
    }

    useEffect(() => {
        getPlaylists();
    }, []);
    
    console.log(pl1.url);

    return(
        <>
            <div className="welcome">
                <h1 className='intro'>Explore</h1>

                <div className='playlist-stack'>
                    <div className='playlist-display' >
                        <img src={pl1.image} alt="pl1" width="160px" />
                        <a href={pl1.url} target="_blank" rel="noopener noreferrer" >{pl1.name}</a>
                    </div>
                    <div className='playlist-display' >
                        <img src={pl2.image} alt="pl2" width="160px" />
                        <a href={pl2.url} target="_blank" rel="noopener noreferrer" >{pl2.name}</a>
                    </div>
                    <div className='playlist-display' >
                        <img src={pl3.image} alt="pl3" width="160px" />
                        <a href={pl3.url} target="_blank" rel="noopener noreferrer" >{pl3.name}</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explore;

// https://open.spotify.com/playlist/1HZlFq0Ebjrvy12Cuw5hQG?si=f23dcd17e83e45f3
// https://open.spotify.com/playlist/5IEX6CpD9ZhUeacEMjMpGP?si=c76f932014454d69
// https://open.spotify.com/playlist/2znryEij05Rt0UDk9XD7Im?si=633f50c1b78c42a2