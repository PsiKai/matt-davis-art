import React, {useContext, useState, useEffect} from 'react'
import AuthContext from "../context/authContext"

const Login = (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, logout, login, register} = authContext;
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push("/")
        }
    }, [isAuthenticated, props.history])
    
    const startLogin = (e) => {
        e.preventDefault()
        const form = {
            name: "Matt",
            password
        }
        // authContext.register(form)
        login(form)
    }

    const typing = (e) => {
        console.log(e.target);
        setPassword(e.target.value)
    }

    return (
        <div className="page-content">
            <form onSubmit={startLogin}>
                <p>Login:</p>
                <input type="password" onChange={typing} value={password}></input>
                <button type="submit">Login</button>
                
            </form>
            
        </div>
    )
}

export default Login

