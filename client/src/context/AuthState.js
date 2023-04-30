import React, { useReducer } from "react"
import AuthContext from "./authContext"
import authReducer from "./authReducer"

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
