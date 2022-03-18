import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './css/App.css';
import LoggedMain from './parts/loggedMain'
import Home from './parts/unlogged';


function App() {
  const [token, setToken] = useState('');
  const [refresh, setRefresh] = useState('');

  const tokens = {
    access: token,
    refresh: refresh
  }

  // const TokenContext = React.createContext(tokens)

  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
      setRefresh(json.refresh_token);
    }

    getToken();

  }, []);

  return (
    <>
        { code ? <LoggedMain code={code}/> : <Home/> }
    </>
  );
}

export default App;