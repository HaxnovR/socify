import React, { useState, useEffect, useContext } from 'react';
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

  const TokenContext = React.createContext(tokens)

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
        { (token === '') ? <Home/> : <LoggedMain token={token} refresh={refresh}/> }
    </>
  );
}

export default App;