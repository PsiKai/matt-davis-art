import React from 'react';
import {Link} from 'react-router-dom';
import LoginToast from "./Login"

const Footer = () => {

    return (
        <footer>
            <Link to="/login">
                Login
            </Link>
            
        </footer>
    )
}

export default Footer
