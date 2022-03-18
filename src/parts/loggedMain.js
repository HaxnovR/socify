import WebPlayback from "../WebPlayback";
import Header from "./header";
import UseAuth from "../useAuth";
import React, { useState, useEffect } from 'react'

const LoggedMain = (props) =>{

    const [accessToken, setAccessToken] = useState(null);
    const [Loading, setLoading] = useState(true);
    console.log(accessToken);

    useEffect(() => {
        getTokenData();
    });

    async function getTokenData(){
        let data = UseAuth(props.code);
        setAccessToken(data)
        if(accessToken !== null)setLoading(false);
    }

    if(Loading){
        return(
            <div>
                <h1>LOADING...</h1>
            </div>
        )
    }
    return(
        <>
            <div className="App">
            <Header/>
             <div className="welcome">
                 <h1 className='intro'>Welcome to Socify</h1>
                 <a className="login" href="/Start">Start Session</a>
             </div>
             <div className='limitHeight'>
               <div className="vid_contain"></div>
             </div>
            </div>
            <WebPlayback token={accessToken} /*refresh={props.refresh}*/ />
        </>
    )
}

export default LoggedMain;