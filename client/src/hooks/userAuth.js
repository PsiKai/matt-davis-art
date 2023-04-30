import { useContext } from "react"
import AlertContext from "../context/alertContext"
import AuthContext from "../context/authContext"

import setAuthToken from "../components/utils/setAuthToken"

import axios from "axios"

export function useLogin() {
  const { dispatch } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)

  const login = async formData => {
    try {
      const res = await axios.post("/api/user/login", formData)
      dispatch({ type: "LOGIN", payload: res.data })
      localStorage.setItem("token", res.data.token)
      setAuthToken(res.data.token)
      return true
    } catch (err) {
      console.log(err)
      if (err.response?.data?.msg) {
        setAlert(err.response.data.msg, "var(--medium)")
      }
      return false
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("token")
    setAuthToken(null)
    setAlert("Logged out", "var(--medium)")
  }

  return { login, logout }
}

export function useAuth() {
  const { dispatch } = useContext(AuthContext)
  const { setAlert } = useContext(AlertContext)

  const loadUser = async () => {
    if (localStorage.token) setAuthToken(localStorage.token)
    try {
      const res = await axios.get("/api/user/login")
      dispatch({ type: "USER_LOADED", payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch({ type: "LOGOUT" })
      localStorage.removeItem("token")
      if (err.response?.data?.msg) {
        setAlert(err.response.data.msg, "var(--medium)")
      }
    }
  }

  return loadUser
}
