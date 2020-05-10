import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../auth/AuthContext';

function Header() {

    const { username, setUsername } = useContext(AuthContext);
    const [displayMenu, setDisplayMenu] = useState(false)

    function handleLogout(e) {
        e.preventDefault();

        setUsername(null);
        localStorage.removeItem('username');
    }

    function handleClick(e) {
        if (!displayMenu) {
            setDisplayMenu(true);
        } else {
            setDisplayMenu(false);
        }
    }

    return (
        <nav className='nav-bar flex-container'>
            <Link to='/'><img src='/images/home.png' alt='bkgImg'></img><span className='logo'>VFD Time</span></Link>
            <div className='flex-container'>
                <div className='nav-bar-links'>
                    <Link to='/products'>
                        Products
                        </Link>
                </div>
                <div className='nav-bar-links'>
                    <Link to='/projects'>
                        Projects
                        </Link>
                </div>
                <div className='nav-bar-links'>
                    {(username ?
                        <div className='dropdown'>
                            <div onClick={handleClick} className='dropdown-button'><span style={{fontSize: '12px'}}>Welcome!</span><br/> {username} </div>

                            {displayMenu ? (
                                <ul>
                                    <li><a href='/add'> Add part</a></li>
                                    <li><a href='/' onClick={handleLogout}> Logout</a></li>
                                </ul>
                            ) : null }

                        </div>
                        :
                        <>
                            <Link to='/login' className='auth'>Login </Link> <br />
                            <Link to='/register' className='auth'> Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;