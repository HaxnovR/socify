function Header(){
    async function switchPage(){
        const currentURL = window.location.href;
        console.log(currentURL);
    }
    const Logout = () => {
        localStorage.removeItem('AuthCode');
    }
    return(
        <header className="flex">
            <h1 className='Logo'>Socify.</h1>
            <nav className="head">
                <a className='Button' href="/">Home</a>
                <a className='Button' href="/sessions">Listen along</a>
                <a onClick={switchPage} className='Button' href="/explore">Explore</a>
                <a className='Button' href="/lobbies">Lobbies</a>
                <a className="Button" onClick={Logout} href="/">Logout</a>
            </nav>
            <div className="search">
                <input type="text" id="search" placeholder="Search"/>
            </div>
        </header>
    )
}

export default Header;