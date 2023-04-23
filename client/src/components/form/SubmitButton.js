import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import PublishIcon from "@material-ui/icons/Publish"

const SubmitButton = ({ pending, disabled }) => {
  return (
    <button type="submit" disabled={disabled}>
      {pending ? (
        <>
          Submitting... <CircularProgress />
        </>
      ) : (
        <>
          Submit <PublishIcon />
        </>
      )}
    </button>
  )
}

export default SubmitButton
