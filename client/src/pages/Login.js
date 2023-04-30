import React, { useState } from "react"

import { useHistory } from "react-router-dom"
import { useLogin } from "../hooks/userAuth"

import Alerts from "../components/layout/Alerts"
import PageHeader from "../components/layout/PageHeader"
import PasswordInput from "../components/form/PasswordInput"
import LoginButton from "../components/form/LoginButton"

import "../styles/edit.css"

const Login = () => {
  const { login } = useLogin()
  const history = useHistory()

  const [password, setPassword] = useState("")
  const [pendingLogin, setPendingLogin] = useState(false)

  const submitLogin = async e => {
    e.preventDefault()
    setPendingLogin(true)
    const successfulLogin = await login({ password })
    setPassword("")
    setPendingLogin(false)
    if (successfulLogin) history.push("/edit")
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  return (
    <div className="page-content">
      <PageHeader heading="Matt's admin page" />
      <div className="login-greeting">
        <h3>Hey, y'all!</h3>
        <p>Don't peak behind the curtain, and don't try to guess my password!</p>
        <p>HINT: it's definitely not 12345</p>
      </div>
      <form className="login-form" onSubmit={submitLogin}>
        <PasswordInput onChange={handlePassword} value={password} />
        <LoginButton pending={pendingLogin} disabled={pendingLogin} />
      </form>
      <Alerts />
    </div>
  )
}

export default Login
