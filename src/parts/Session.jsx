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

const Session = ({socket, userID}) => { 
    const[roomID, setRoomID] = useState('');

    const Hostroom = () => {
        console.log("Hostroom Clicked", socket);
        socket.emit("hosting-req", socket.id);
        socket.on("room_id", (roomcode) => {
            console.log("Recieved Room Code = ", roomcode);
            setRoomID(roomcode);
        })
    }

    const invitecode = (event) => {
        event.preventDefault();
        console.log(roomID, socket.id);
        socket.emit("joining-req", userID, roomID);
    }


    useEffect(() => {
        
    }, [])


    return(
        <>
            <div className="welcome">
                <h1 className='intro'>Start Your Session</h1>
                <a className='Button' onClick={Hostroom}>Host</a>
                <form onSubmit={invitecode}>
                <label className='search'>
                    <input className='Button'
                    type="text"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    />
                    </label>
                    <input className='Button' type="submit" />
                </form>
            </div>
        </>
    )
}

export default Session;
