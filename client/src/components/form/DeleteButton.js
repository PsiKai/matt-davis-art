import React from "react"

import CircularProgress from "@material-ui/core/CircularProgress"
import DeleteIcon from "@material-ui/icons/Delete"

const DeleteButton = ({ pending, onClick, disabled }) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {pending ? (
        <>
          Deleting... <CircularProgress />
        </>
      ) : (
        <>
          Delete <DeleteIcon />
        </>
      )}
    </button>
  )
}

export default DeleteButton
