import React, {useContext, useState, useEffect, useRef} from 'react'
import "../styles/edit.css"
import PageHeader from '../components/layout/PageHeader';
import AuthContext from "../context/authContext"
import Alerts from "../components/layout/Alerts"
import AlertContext from "../context/alertContext";

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext
    const authContext = useContext(AuthContext)
    const {login, errors} = authContext;
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const passwordInput = useRef()

    useEffect(() => {
        errors.forEach(err => {
            if (err !== "") {
            setAlert(err, "var(--medium)")
            }
            errors.pop(err)
        })
        // eslint-disable-next-line 
    }, [errors])
    
    const startLogin = (e) => {
        e.preventDefault()
        const form = {
            name: "Matt",
            password
        }
        // authContext.register(form)
        login(form)
        setPassword("")
        setShowPassword(false)
        passwordInput.current.type = "password"
    }

    const typing = (e) => {
        setPassword(e.target.value)
    }

    const revealPassword = (type) => {
        setShowPassword(!showPassword)
        passwordInput.current.type = type
    }

    return (
        <div className="page-content">
            <PageHeader heading="Matt's admin page" />
            <div className="login-greeting">
                <h3>Hey, y'all!</h3>  
                <p>Don't peak behind the curtain, and don't try to guess my password!</p>
                <p>HINT: it's definitely not 12345</p>
            </div>
            <form className="login-form" onSubmit={startLogin}>
                <label>Password:</label>
                <div className="password-input">
                    <input type="password" onChange={typing} value={password} ref={passwordInput}></input>
                    {showPassword ? 
                        <VisibilityIcon onClick={() => revealPassword("password")}/>
                        : 
                        <VisibilityOffIcon onClick={() => revealPassword("text")}/>}
                </div>
                <button data-text="Login" type="submit">Login</button>
                
            </form>
            <Alerts />
        </div>
    )
}

export default Login

