import {
    REGISTER,
    LOGIN,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR
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
        case AUTH_ERROR:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                errors: [action.payload]
            }
        default: 
            return state
    }
}