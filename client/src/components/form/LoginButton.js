import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const LoginButton = ({ pending, disabled }) => {
  return (
    <button type="submit" disabled={disabled}>
      {pending ? (
        <>
          Logging in... <CircularProgress />
        </>
      ) : (
        <>
          Login <ExitToAppIcon />
        </>
      )}
    </button>
  )
}

export default LoginButton
