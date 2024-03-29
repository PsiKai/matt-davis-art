import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import AuthContext from "../context/authContext"

const PrivateRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const {isAuthenticated} = authContext;

    return (
        <Route {...rest} render={props => !isAuthenticated && !localStorage.token ? (
            <Redirect to="/signin" />
        ) : (
            <Component {...props} />
        )}
            
        />
    )
}

export default PrivateRoute
