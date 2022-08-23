import React,{useEffect, useState} from 'react';
import './css/App.css';
import LoggedMain from './parts/loggedMain'
import Home from './parts/unlogged';


function App() {

  const code = new URLSearchParams(window.location.search).get('code');

  const LocalToken = localStorage.getItem('AuthCode');

  const Foundtoken = () => {
    if(localStorage.getItem('AuthCode')){
      console.log('1');
      return(<LoggedMain token={LocalToken}/>);
    }
    if(code){
      console.log('2');
      return(<LoggedMain code={code}/>);
    }
    else{
      console.log('3');
      return(<Home/>);
    }
  }


  return (
    <>
        <Foundtoken/>
    </>
  );
}

export default App;