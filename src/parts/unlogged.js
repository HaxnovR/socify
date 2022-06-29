import Header from './header';

// const server = "http://localhost:5000"
const server = "https://socifyserver.herokuapp.com"
const href = `${server}/auth/login`;

function Home() {
    return (
      <div className="App">
          <Header/>
  
        <div className="welcome">
            <h1 className='intro'>Welcome to Socify</h1>
            <a className="login" href={href}>Log in</a>
            {/* <a className="login" href="/auth/login">Log in</a> */}
        </div>
        <div className='limitHeight'>
          <div className="vid_contain"></div>
        </div>
        <div className='info'>
          <div className='center'>
            <p className='infoText'>Public Listen Along Lobbies for Spotify</p>
            <p className='Authors'>A project by HaxnovR, AhmadPupg & Ilamadisimo</p>
          </div>
        </div>
          
      </div>
    );
  }
  
  export default Home;