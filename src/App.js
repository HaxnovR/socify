import React, { useState, useEffect } from 'react';
import './css/App.css';
import WebPlayback from './WebPlayback'
import Home from './Home';


function App() {
  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
        { (token === '') ? <Home/> : <WebPlayback token={token} /> }
    </>
  );
}

export default App;