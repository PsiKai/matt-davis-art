import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import AuthContext from "../context/authContext"

const LoginRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated} = authContext;
    return (
        <Route {...rest} render={props => isAuthenticated && localStorage.token ? (
            <Redirect to="/edit" /> 
        ) : (
            <Component {...props} />
        )}
        />
    )
}

export default LoginRoute
