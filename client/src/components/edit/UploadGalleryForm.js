import React from "react"

import FileInput from "../form/FileInput"
import SubmitButton from "../form/SubmitButton"
import GalleryDetails from "../form/GalleryDetails"

const UploadGalleryForm = ({ form, formUpdate, imgUpdate, upload, file, inputFile, pending }) => {
  return (
    <form onSubmit={upload}>
      <FileInput file={file} onChange={imgUpdate} inputFile={inputFile} />
      <GalleryDetails form={form} formUpdate={formUpdate} />
      <SubmitButton pending={pending} disabled={pending} />
    </form>
  )
}

export default UploadGalleryForm
