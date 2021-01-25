import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../components/utils/setAuthToken"
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR
} from './types'

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        user: null,
        errors: []
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    //load user 
    const loadUser = async () => {
        
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get("/login")
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data.msg);
            dispatch({
                type: LOGOUT,
                payload: ""
            })
        }
        

        // if (res.data.status === 400 || res.data.status === 401) {
        //     console.log(res.data.msg);
        //     dispatch({
        //         type: LOGOUT,
        //         payload: ""
        //     })
        // } else {
        //     console.log(res.data.name, "is logged in.");
        // dispatch({
        //     type: USER_LOADED,
        //     payload: res.data
        // })
        // }
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

        try {
            const res = await axios.post("/login", formData, config)
            dispatch({
                type: LOGIN,
                payload: res.data
            })
            loadUser();
        } catch (err) {
            // window.alert(err.response.data.msg);
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.msg
            })
        }
    }

    //logout
    const logout = () => dispatch({type: LOGOUT, payload: "Logged out"})


    return (
        <AuthContext.Provider
            value= {{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user, 
                errors: state.errors,
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