import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>Artist Matt Davis</h1>
            </Link>
            <ul className="header-links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/prints">Prints</Link>
            </li>
              <li>TP Man Comics</li>
              <li>Gallery</li>
            </ul>
            
        </header>
    )
}

export default Header
