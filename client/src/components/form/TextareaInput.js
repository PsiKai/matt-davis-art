import React from "react"

const TextareaInput = ({ label, name, value, onChange, rows = 3 }) => {
  return (
    <div className="input__wrapper">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={rows} value={value} onChange={onChange} />
    </div>
  )
}

export default TextareaInput
