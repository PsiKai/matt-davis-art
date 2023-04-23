import React from "react"

const ArtFormatRadios = ({ original, onChange }) => {
  return (
    <div className={`radio-group ${original}`}>
      <label className="input__wrapper">
        <input
          type="radio"
          name="original"
          value="print"
          checked={original === "print"}
          onChange={onChange}
        />
        <span>Print</span>
      </label>
      <label className="input__wrapper">
        <input
          type="radio"
          name="original"
          value="original"
          checked={original === "original"}
          onChange={onChange}
        />
        <span>Original</span>
      </label>
    </div>
  )
}

export default ArtFormatRadios
