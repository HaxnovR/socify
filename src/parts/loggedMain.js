import WebPlayback from "../WebPlayback";
import Header from "./header";

function LoggedMain(props){
    return(
        <>
            <div className="App">
            <Header/>
             <div className="welcome">
                 <h1 className='intro'>Create Your Session</h1>
                 <a className="login" href="/Start">Start Session</a>
             </div>
             <div className='limitHeight'>
               <div className="vid_contain"></div>
             </div>
            </div>
            <WebPlayback token={props.token} refresh={props.refresh} />
        </>
    )
}

export default LoggedMain;