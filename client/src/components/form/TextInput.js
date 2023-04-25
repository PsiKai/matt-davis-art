import React from "react"

const TextInput = ({ label, value, onChange, name, ...inputProps }) => {
  return (
    <div className="input__wrapper">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type="text" value={value} onChange={onChange} {...inputProps} />
    </div>
  )
}

export default TextInput
