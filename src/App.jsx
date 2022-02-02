import './css/App.css';
let bg = "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"

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
      <div className="vid_contain">
          <img src={bg} alt='background'></img>
      </div>
        
    </div>
  );
}

export default App;
