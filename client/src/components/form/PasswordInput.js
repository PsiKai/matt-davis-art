import React, { useState } from "react"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

const PasswordInput = ({ onChange, value, name = "password" }) => {
  const [inputType, setInputType] = useState("password")

  return (
    <div className="input__wrapper">
      <label htmlFor="password-input">Password:</label>
      <div className="password-input">
        <input id="password-input" type={inputType} name={name} onChange={onChange} value={value} />
        {inputType === "text" ? (
          <button onClick={() => setInputType("password")} aria-label="hide" type="button">
            <VisibilityIcon />
          </button>
        ) : (
          <button onClick={() => setInputType("text")} aria-label="show" type="button">
            <VisibilityOffIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default PasswordInput
