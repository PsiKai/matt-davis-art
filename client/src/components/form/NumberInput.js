import React from "react"

const NumberInput = ({ name, label, onChange, value, ...restProps }) => {
  return (
    <div className="input__wrapper">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="number"
        inputMode="decimal"
        onChange={onChange}
        value={value}
        {...restProps}
      />
    </div>
  )
}

export default NumberInput
