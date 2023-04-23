import React from "react"
import NumberInput from "./NumberInput"

const StoreDetails = ({ form, formUpdate }) => {
  return (
    <div className="upload-prints--dimensions">
      {/* <div className="input__wrapper">
        <label htmlFor="width">Width:</label>
        <input
          id="width"
          name="width"
          type="number"
          min="0.0"
          max="100.0"
          step="0.5"
          onChange={formUpdate}
          value={form.width}
          inputMode="decimal"
        />
      </div> */}
      <NumberInput
        label="Width:"
        name="width"
        onChange={formUpdate}
        value={form.width}
        min="0.0"
        max="100.0"
        step="0.5"
      />

      {/* <div className="input__wrapper">
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          name="height"
          type="number"
          min="0.0"
          max="100.0"
          step="0.5"
          onChange={formUpdate}
          value={form.height}
          inputMode="decimal"
        />
      </div> */}
      <NumberInput
        label="Height:"
        name="height"
        onChange={formUpdate}
        value={form.height}
        min="0.0"
        max="100.0"
        step="0.5"
      />

      {/* <div className="price input__wrapper">
        <label htmlFor="price">Price: $</label>
        <input
          id="price"
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          name="price"
          onChange={formUpdate}
          value={form.price}
          inputMode="decimal"
        />
      </div> */}
      <NumberInput
        label="Price: $"
        name="price"
        onChange={formUpdate}
        value={form.price}
        min="0.00"
        max="10000.00"
        step="0.01"
      />
    </div>
  )
}

export default StoreDetails
