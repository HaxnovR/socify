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


const Session = (props) => { 



    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const sessionLink = () => {
        var text = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz';
        for (var i = 0; i < 7; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
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

    console.log("LINK: ", sessionLink());


    return(
        <>
            <div className="welcome">
                <h1 className='intro'>Start Your Session</h1>
                <a className='Button' href='https://google.com'>Host</a>
            </div>
        </>
    )
}

export default Session;
