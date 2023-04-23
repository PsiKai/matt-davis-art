import React from "react"
import TextInput from "./TextInput"
import TextareaInput from "./TextareaInput"

const GalleryDetails = ({ form, formUpdate }) => {
  return (
    <>
      <TextInput label="New Title" value={form.title} onChange={formUpdate} name="title" />
      <TextInput label="New Medium" value={form.medium} onChange={formUpdate} name="medium" />
      <TextareaInput
        label="New Description"
        value={form.description}
        onChange={formUpdate}
        name="description"
      />
    </>
  )
}

export default GalleryDetails
