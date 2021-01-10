import React, {useContext, useState, useEffect} from 'react'
import AuthContext from "../context/authContext"

const LoginToast = (props) => {
    const {close, open} = props
    const authContext = useContext(AuthContext)
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(authContext.isAuthenticated) {
            props.history.push("/")
        }
    }, [authContext.isAuthenticated, props.history])
    
    const loging = (e) => {
        e.preventDefault()
        const form = {
            name: "Matt",
            password
        }
        // authContext.register(form)
        authContext.login(form)
        close()
    }

    const typing = (e) => {
        console.log(e.target);
        setPassword(e.target.value)
    }

    const logout = () => {
        authContext.logout()
    }

    return (
        <div className={`login-toast ${open}`}>
            <form onSubmit={loging}>
                <p>Login:</p>
                <input type="password" onChange={typing} value={password}></input>
                <button type="submit">Login</button>
                
            </form>
            <button type="submit" onClick={logout}>Logout</button>
        </div>
    )
}

export default LoginToast

