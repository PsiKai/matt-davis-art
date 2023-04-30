import React from "react"
import { CircularProgress } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined"
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined"

function SendEmailButton({ pending, disabled }) {
  return (
    <button type="submit" disabled={disabled}>
      {pending ? (
        <>
          Sending... <CircularProgress />
        </>
      ) : (
        <>
          Send <NearMeOutlinedIcon />
        </>
      )}
    </button>
  )
}

export default SendEmailButton
