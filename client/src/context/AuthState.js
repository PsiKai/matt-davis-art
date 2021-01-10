import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../components/utils/setAuthToken"
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    USER_LOADED
} from './types'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    //load user 
    const loadUser = async () => {
        
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        const res = await axios.get("/login")
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }

    ///register user
    const register = async (formData) => {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post("/register", formData, config)

        dispatch({
            type: REGISTER,
            payload: res.data
        })

        loadUser();    
    }


    //login user 
    const login = async (formData) => {
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        const res = await axios.post("/login", formData, config)

        dispatch({
            type: LOGIN,
            payload: res.data
        })
        loadUser();
    }

    //logout
    const logout = () => dispatch({type: LOGOUT})


    return (
        <AuthContext.Provider
            value= {{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user, 
                register,
                login,
                loadUser,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;