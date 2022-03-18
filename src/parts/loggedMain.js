import WebPlayback from "../WebPlayback";
import Header from "./header";
import UseAuth from "../useAuth";
import React, { useState, useEffect } from 'react'
import { useRef } from "react/cjs/react.production.min";

const LoggedMain = (props) =>{
    let accessToken
    if(props.token !== undefined){
        console.log('Local Token Found :',props.token);
        accessToken = props.token;
    }
    else{
        console.log('Used new Token from Code:',props.code);
        accessToken = UseAuth(props.code);
    }
    const [isLoading, setIsLoading] = React.useState(true);

    const handleLoading = () => {
        setIsLoading(false);
    }

    useEffect(() => {
        window.addEventListener("load",handleLoading);
        return () => window.removeEventListener("load",handleLoading);
    })
    const Logout = () => {
        localStorage.removeItem('AuthCode');
    }

    const Isloading = () => {
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }
    const Hasloaded = () => {
        localStorage.setItem('AuthCode',accessToken);
        return(
            <>
                <div className="App">
                <Header/>
                 <div className="welcome">
                     <h1 className='intro'>Under Development</h1>
                     <a className="login" onClick={Logout} href="/">Logout</a>
                 </div>
                 <div className='limitHeight'>
                   <div className="vid_contain"></div>
                 </div>
                </div>
                <WebPlayback token={accessToken} /*refresh={props.refresh}*/ />
            </>
        )
    }
    return (!isLoading ? <Hasloaded/> : <Isloading/> );
    
}

export default LoggedMain;