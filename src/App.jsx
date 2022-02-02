import './css/App.css';
let bg = "https://gotiny.cc/m5xwtn"

function App() {
  return (
    <div className="App">
        <header className="flex">
            <h1 className='Logo'>Socify.</h1>
            <nav className="head">
                <a className='Button' href="/explore">Home</a>
                <a className='Button' href="/explore">Listen along</a>
                <a className='Button' href="/explore">Explore</a>
                <a className='Button' href="/login">Log In</a>
            </nav>
            <div className="search">
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/> */}
                <input type="text" id="search" placeholder="Search"/>
                {/* <button id="btn" onclick="myFunction()"><i className="fa fa-search"></i></button> */}
            </div>
        </header>

      <div className="welcome">
          <h1 className='intro'>Welcome to Socify</h1>
          <a className="login" href="/login">Log in</a>
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

export default App;
