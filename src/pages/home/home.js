import React from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../../components/nav/navbar';
import './home.css';

const Homepage = ()=>{

    return(
        <div className="home-wrapper">
            <NavBar/>
            <main className="main-home-section">
                <h1>CHAT APP</h1>
                <div className="auth-btn-ctn">
                    <Link to="/login"><button className="auth-btn auth-login-btn">sign in</button></Link>
                    <Link to="/signup"><button className="auth-btn auth-signup-btn">sign up</button></Link>
                </div>
            </main>
        </div>
    )
} 

export default Homepage;