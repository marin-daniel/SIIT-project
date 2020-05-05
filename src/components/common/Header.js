import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../auth/AuthContext';

function Header() {

    const { username, setUsername} = useContext(AuthContext);

    function handleLogout(e) {
        e.preventDefault();

        setUsername(null);
        localStorage.removeItem('username');
    }

    return (
        <nav className='navBar flex-container'>
            <Link to="/"><img src = '/images/home.png' alt='bkgImg'></img><span className='logo'>VFD Time</span></Link>
            <ul className='flex-container'>
                <li>
                    <Link  to="/products">
                        Products
                        </Link>
                </li>
                <li>
                    <Link  to="/projects">
                        Projects
                        </Link>
                </li>
                <li>
                    {(username ?
                        <>
                            <p className='welcome-message'>Hello {username}</p>
                            <a href="/" onClick={handleLogout}> Logout</a>
                        </>
                        :
                        <>
                            <Link to="/login" className='auth'>Login </Link> <br />
                            <Link to="/register" className='auth'> Register</Link>
                        </>
                    )}
                </li>

            </ul>
            
        </nav>
    );
}

export default Header;