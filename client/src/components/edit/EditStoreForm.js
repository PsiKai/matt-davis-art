import React from "react"
import ArtFormatRadios from "../form/ArtFormatRadios"

import SubmitButton from "../form/SubmitButton"
import DeleteButton from "../form/DeleteButton"
import StoreDetails from "../form/StoreDetails"
import TextInput from "../form/TextInput"

const EditStoreForm = ({ submitChanges, form, pending, formUpdate }) => {
  const onSubmit = e => {
    e.preventDefault()
    submitChanges("PATCH")
  }

  return (
    <form className="update-gallery--update" onSubmit={onSubmit}>
      <TextInput label="New Title" value={form.title} onChange={formUpdate} name="title" />

      <div className="upload-prints--stock">
        <ArtFormatRadios onChange={formUpdate} original={form.original} />
        <StoreDetails form={form} formUpdate={formUpdate} />
      </div>

      <SubmitButton pending={pending === "PATCH"} disabled={!!pending} />
      <DeleteButton
        pending={pending === "DELETE"}
        disabled={!!pending}
        onClick={() => submitChanges("DELETE")}
      />
    </form>
  )
}

export default EditStoreForm
