import React from "react"

import { CSSTransition } from "react-transition-group"

import FileInput from "../form/FileInput"
import ArtFormatRadios from "../form/ArtFormatRadios"
import SubmitButton from "../form/SubmitButton"
import StoreDetails from "../form/StoreDetails"
import TextInput from "../form/TextInput"

const UploadStoreForm = ({ form, formUpdate, imgUpdate, upload, file, inputFile, pending }) => {
  return (
    <form onSubmit={upload}>
      <FileInput file={file} onChange={imgUpdate} inputFile={inputFile} />

      <TextInput label="Title" value={form.title} onChange={formUpdate} name="title" required />

      <div className="upload-prints--stock">
        <ArtFormatRadios original={form.original} onChange={formUpdate} />

        <CSSTransition in={form.original === "original"} timeout={200} classNames="drop-in" unmountOnExit>
          <StoreDetails form={form} formUpdate={formUpdate} />
        </CSSTransition>
      </div>
      <SubmitButton pending={pending} disabled={pending} />
    </form>
  )
}

export default UploadStoreForm
