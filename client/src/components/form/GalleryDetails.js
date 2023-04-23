import React from "react"
import TextInput from "./TextInput"

const GalleryDetails = ({ form, formUpdate }) => {
  return (
    <>
      {/* <div className="input__wrapper">
        <label htmlFor="update-title">New Title</label>
        <input id="update-title" name="title" type="text" value={form.title} onChange={formUpdate} />
      </div> */}

      {/* <div className="input__wrapper">
        <label htmlFor="update-medium">New Medium</label>
        <input id="update-medium" name="medium" type="text" value={form.medium} onChange={formUpdate} />
      </div> */}
      <TextInput label="New Title" value={form.title} onChange={formUpdate} name="title" />
      <TextInput label="New Medium" value={form.medium} onChange={formUpdate} name="medium" />

      <div className="input__wrapper">
        <label htmlFor="update-description">New Description</label>
        <textarea
          id="update-description"
          name="description"
          rows="3"
          value={form.description}
          onChange={formUpdate}
        />
      </div>
    </>
  )
}

export default GalleryDetails
