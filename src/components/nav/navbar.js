import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css'

const NavBar = ({username,isauth})=>{

    return(
        <header className="main-header">
            {
                isauth ?
                    <nav className="nav-ctn">
                        <h2 className="auth-username" >  
                            {username}                              
                        </h2> 
                        <button className="auth-logout-btn">
                            <Link to="/">Logout</Link>
                        </button >
                    </nav>
                    :
                    <nav className="nav-ctn">
                        <span className="nav-link"><Link to="/login">Login</Link></span>
                        <span className="nav-link"><Link to="/signup">Signup</Link></span>
                    </nav>
            }
        </header>
    )
} 

export default NavBar