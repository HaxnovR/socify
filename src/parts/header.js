function Header(){
    async function switchPage(){
        const currentURL = window.location.href;
        console.log(currentURL);
    }
    return(
        <header className="flex">
            <h1 className='Logo'>Socify.</h1>
            <nav className="head">
                <a className='Button' href="/explore">Home</a>
                <a className='Button' href="/explore">Listen along</a>
                <a onClick={switchPage} className='Button' href="/explore">Explore</a>
                <a className='Button' href="/Lobbies">Lobbies</a>
            </nav>
            <div className="search">
                <input type="text" id="search" placeholder="Search"/>
            </div>
        </header>
    )
}

export default Header;