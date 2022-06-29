import WebPlayback from "../WebPlayback";
import Header from "./header";
import Explore from "./Explore";
import Lobbies from "./Lobbies"
import UseAuth from "../useAuth";
import React, { useEffect } from 'react'

const LoggedMain = (props) =>{
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
    let path = window.location.pathname;
    console.log(path);
    const Home = () => {
        return(
            <>
                 <div className="welcome">
                     <h1 className='intro'>Home Page</h1>
                     <a className="login" onClick={Logout} href="/">Logout</a>
                 </div>
            </>
        )
    }

    const ReturnPath = () => {
        if(path==="/explore"){
            return <Explore token={accessToken} refresh={refreshToken}/>
        }
        if(path==="/lobbies"){
            return <Lobbies/>
        }
        else{
            return <Home/>
        }
    }
    
    const Hasloaded = () => {
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