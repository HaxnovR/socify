import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const token = localStorage.getItem('AuthCode');


const info = {
    name: "",
    image: "",
    url: ""
}

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


const Explore = (props) => { 



    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        fetch("https://socifyserver.herokuapp.com/api/playlists")
          .then(res => res.json())
          .then(
            (result) => {
                setIsLoaded(true);
                setItems(result.plst);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
            }
          )
      }, [])

    
    
    console.log(props.playlists);

    const PlaylistHolder = () => {
        if (!isLoaded) {
            return <div>Loading...</div>;
        } 
        else{
            return (
                <div>
                    {items.map(item => (
                        <div className='playlist-display' >
                            <img src={item.image} alt="pl1" width="160px" />
                            <a href={item.url} target="_blank" rel="noopener noreferrer" >{item.name}</a>
                        </div>
                    ))}
                </div>
            );
        }
    }

    return(
        <>
            <div className="welcome">
                <h1 className='intro'>Explore</h1>

                <div className='playlist-stack'>
                    <PlaylistHolder/>
                </div>
            </div>
        </>
    )
}

export default Explore;

// https://open.spotify.com/playlist/1HZlFq0Ebjrvy12Cuw5hQG?si=f23dcd17e83e45f3
// https://open.spotify.com/playlist/5IEX6CpD9ZhUeacEMjMpGP?si=c76f932014454d69
// https://open.spotify.com/playlist/2znryEij05Rt0UDk9XD7Im?si=633f50c1b78c42a2