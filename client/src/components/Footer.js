import React, { useState } from 'react';
// import {Link} from 'react-router-dom';
import LoginToast from "./LoginToast"

const Footer = (props) => {
    const [open, setOpen] = useState(false)

    const openLogin = () => {
        setOpen(!open)
    }

    return (
        <footer>

            <button onClick={openLogin}>Login</button>
            <LoginToast open={open && "slide-up"} close={openLogin}/>  
        </footer>
    )
}

export default Footer
