import React from "react"
import ArtFormatRadios from "../form/ArtFormatRadios"

import SubmitButton from "../form/SubmitButton"
import DeleteButton from "../form/DeleteButton"
import StoreDetails from "../form/StoreDetails"
import TextInput from "../form/TextInput"

const EditStoreForm = ({ submitChanges, form, pending, formUpdate }) => {
  const onSubmit = e => {
    e.preventDefault()
    submitChanges("/update")
  }

  return (
    <form className="update-gallery--update" onSubmit={onSubmit}>
      <TextInput label="New Title" value={form.title} onChange={formUpdate} name="title" />

      <div className="upload-prints--stock">
        <ArtFormatRadios onChange={formUpdate} original={form.original} />
        <StoreDetails form={form} formUpdate={formUpdate} />
      </div>

      <SubmitButton pending={pending === "update"} disabled={!!pending} />
      <DeleteButton
        pending={pending === "delete"}
        disabled={!!pending}
        onClick={() => submitChanges("/delete")}
      />
    </form>
  )
}

export default EditStoreForm
