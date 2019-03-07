import React from 'react';
import classes from './Header.module.css';
import { Navbar, Jumbotron, Button, nav } from 'react-bootstrap';
const Header = () => {
    return (

        <nav className="navbar navbar-default" className = {classes.navbar}>
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">WebSiteName</a>
                </div>
                
            </div>
        </nav>

    )
}

export default Header;