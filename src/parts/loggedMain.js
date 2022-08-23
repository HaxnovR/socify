import WebPlayback from "../WebPlayback";
import Header from "./header";
import Explore from "./Explore";
import Lobbies from "./Lobbies"
import Session from "./Session"
import UseAuth from "../useAuth";
import React, { useEffect, useState } from 'react';
import SpotifyWebApi from "spotify-web-api-node";
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');



const LoggedMain = (props) =>{
    const[userID, setUserID] = useState('');
    
    let accessToken
    let refreshToken
    let tokens
    if(props.token !== undefined){
        console.log('Local Token Found');
        accessToken = props.token;
    }
    else{
        console.log('Used new Token from Code');
        tokens = UseAuth(props.code);
        accessToken = tokens[0]
        refreshToken = tokens[1]
    }
    const [isLoading, setIsLoading] = React.useState(true);

    var spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(props.token);

    async function getUserinfo(){
        spotifyApi.getMe().then(function(data) {
            let temp = data.body.id;
            setUserID(temp);
            console.log("USER:",temp);
        });
    }

    const handleLoading = () => {
        setIsLoading(false);
    }

    useEffect(() => {
        getUserinfo();
        window.addEventListener("load",handleLoading);
        return () => {
            window.removeEventListener("load",handleLoading);
        };
    }, []);
    
    const Logout = () => {
        localStorage.removeItem('AuthCode');
        socket.emit("disconnect");
    }

    const Isloading = () => {
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    let path = window.location.pathname;
    console.log(path);
    const Home = () => {
        return(
            <>
                  <div className="welcome">
                     <h1 className='intro'>Home Page</h1>
                 </div> 
            </>
        )
    }

    const ReturnPath = () => {
        if(path==="/explore"){
            return <Explore token={accessToken} refresh={refreshToken} userID={userID}/>
        }
        if(path==="/lobbies"){
            return <Lobbies userID={userID}/>
        }
        if(path==="/session"){
            return <Session socket={socket} userID={userID}/>
        }
        else{
            return <Home/>
        }
    }
    
    const Hasloaded = () => {
        socket.emit('storeClientInfo', { customId:userID });
        localStorage.setItem('AuthCode',accessToken);
        return(
            <>
                <div className="App">
                <Header/>
                <div>
                    <ReturnPath/>
                </div>
                 <div className='limitHeight'>
                   <div className="vid_contain"></div>
                 </div>
                </div>
                <WebPlayback token={accessToken} refresh={refreshToken} />
            </>
        )
    }
    return (!isLoading ? <Hasloaded/> : <Isloading/> );
    
}

export default LoggedMain;