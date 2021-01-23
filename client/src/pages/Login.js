import React, {useContext, useState, useEffect} from 'react'
import AuthContext from "../context/authContext"

const Login = (props) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, login} = authContext;
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push("/edit")
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
        setPassword(e.target.value)
    }

    return (
        <div className="page-content">
            <form onSubmit={startLogin}>
                <p>Login:</p>
                <input type="password" onChange={typing} value={password}></input>
                <button data-text="Login" type="submit">Login</button>
                
            </form>
            
        </div>
    )
}

export default Login

