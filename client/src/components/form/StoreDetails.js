import React from "react"
import NumberInput from "./NumberInput"

const StoreDetails = ({ form, formUpdate }) => {
  return (
    <div className="upload-prints--dimensions">
      <NumberInput
        label="Width:"
        name="width"
        onChange={formUpdate}
        value={form.width}
        min="0.0"
        max="100.0"
        step="0.5"
      />
      <NumberInput
        label="Height:"
        name="height"
        onChange={formUpdate}
        value={form.height}
        min="0.0"
        max="100.0"
        step="0.5"
      />
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
