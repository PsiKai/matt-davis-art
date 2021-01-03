import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to="/edit">
                <button>Login</button>
            </Link>
            
        </footer>
    )
}

export default Footer
