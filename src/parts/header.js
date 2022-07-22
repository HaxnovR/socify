import { useRef, useState, useEffect } from 'react';

function Header(){
    async function switchPage(){
        const currentURL = window.location.href;
        console.log(currentURL);
    }
    const Logout = () => {
        localStorage.removeItem('AuthCode');
    }
    var elem;

    const [toggleMenu, setToggleMenu] = useState(false)
    setTimeout(() => {
        console.log("TIMEOUT");
        elem = document.getElementById('navbtn');
    }, 200);

    

    const toggleNav = () => {
        
        if(toggleMenu){
            elem.classList.remove("opened");
        }
        else{
            elem.classList.add("opened");
        }
        setToggleMenu(!toggleMenu);       
    }
    
    // useEffect(() => {
    //     toggleNav();
    // }, [])
    

    return(
        <>
        <header className="flex">
            <h1 className='Logo'>Socify.</h1>
            <button onClick={toggleNav} id='navbtn' className="menu" aria-label="Main Menu">
                <svg width="70" height="60" viewBox="0 0 100 100">
                    <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                    <path className="line line2" d="M 20,50 H 80" />
                    <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                </svg>
            </button>
            <nav className="head">
                <a className='Button' href="/">Home</a>
                <a className='Button' href="/session">Listen along</a>
                <a className='Button' href="/explore">Explore</a>
                <a className='Button' href="/lobbies">Lobbies</a>
                <a className="Button" onClick={Logout} href="/">Logout</a>
            </nav>
            <div className="search">
                <input type="text" id="search" placeholder="Search"/>
            </div>
            
        </header>
        {toggleMenu ? <div className='rendered-head'>
                <nav className='responsive-btn'>
                    <a className='Button' href="/">Home</a>
                    <a className='Button' href="/sessions">Listen along</a>
                    <a className='Button' href="/explore">Explore</a>
                    <a className='Button' href="/lobbies">Lobbies</a>
                    <a className="Button" onClick={Logout} href="/">Logout</a>
                </nav>
            </div>: null }
            
        </>
    )
}

export default Header;