import {
    REGISTER,
    LOGIN,
    LOGOUT,
    USER_LOADED
} from "./types"

// eslint-disable-next-line 
export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER:
        case LOGIN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
            
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            }
        default: 
            return state
    }
}