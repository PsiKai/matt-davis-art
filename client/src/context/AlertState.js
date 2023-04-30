import React, { useCallback, useReducer } from "react"
import { v4 as uuidv4 } from "uuid"
import AlertContext from "./alertContext"
import alertReducer from "./alertReducer"
import { SET_ALERT, REMOVE_ALERT } from "./types"

const AlertState = props => {
  const initialState = []

  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = useCallback((msg, color) => {
    if (!msg) return
    const id = uuidv4()
    dispatch({
      type: SET_ALERT,
      payload: { msg, color, id },
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
  }, [])

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
