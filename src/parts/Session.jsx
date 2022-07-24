import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { io } from 'socket.io-client';

const token = localStorage.getItem('AuthCode');

// const socket = io('http://localhost:5000');
// // const socket = io('https://socifyserver.herokuapp.com');

// socket.on("connect", () => {
//     console.log("ID:",socket.id);
// });


const info = {
    name: "",
    image: "",
    url: ""
}

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);


const Session = ({socket}) => { 



    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const Hostroom = () => {
        console.log("Hostroom Clicked");
        console.log("clicked by ID:",socket.id);
        socket.emit("hosting-req");
    }


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


    return(
        <>
            <div className="welcome">
                <h1 className='intro'>Start Your Session</h1>
                <a className='Button' onClick={Hostroom}>Host</a>
            </div>
        </>
    )
}

export default Session;
