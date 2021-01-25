import React, {useContext, useState, useEffect} from 'react'
import PageHeader from '../components/PageHeader';
import AuthContext from "../context/authContext"
import Alerts from "../components/Alerts"
import AlertContext from "../context/alertContext";


const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext
    const authContext = useContext(AuthContext)
    const {isAuthenticated, login, errors} = authContext;
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push("/edit")
        }
    }, [isAuthenticated, props.history])

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
    }

    const typing = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="page-content">
            <PageHeader heading="Matt's admin page" />
            <h3>Hey, y'all!</h3>  
            <p>Don't peak behind the curtain, and don't try to guess my password!</p>
            <p>HINT: it's definitely not 12345</p>
            <form className="login-form" onSubmit={startLogin}>
                <label>Password:</label>
                <input type="password" onChange={typing} value={password}></input>
                <button data-text="Login" type="submit">Login</button>
                
            </form>
            <Alerts />
        </div>
    )
}

export default Login

