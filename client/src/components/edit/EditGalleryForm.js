import React from "react"

import SubmitButton from "../form/SubmitButton"
import DeleteButton from "../form/DeleteButton"
import GalleryDetails from "../form/GalleryDetails"

const EditGalleryForm = ({ form, formUpdate, pending, submitChanges }) => {
  const onSubmit = e => {
    e.preventDefault()
    submitChanges("PATCH")
  }

  return (
    <form className="update-gallery--update" onSubmit={onSubmit}>
      <GalleryDetails form={form} formUpdate={formUpdate} />
      <SubmitButton pending={pending === "PATCH"} disabled={!!pending} />
      <DeleteButton
        pending={pending === "DELETE"}
        onClick={() => submitChanges("DELETE")}
        disabled={!!pending}
      />
    </form>
  )
}

export default EditGalleryForm
