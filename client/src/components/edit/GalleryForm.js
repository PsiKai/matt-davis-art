import React from "react"
import { CircularProgress } from "@material-ui/core"
import PublishIcon from "@material-ui/icons/Publish"

const GalleryForm = ({ form, formUpdate, imgUpdate, upload, file, inputFile, pending }) => {
  return (
    <form onSubmit={upload}>
      <label className={file ? "file-input__label small-label" : "file-input__label"}>
        <span>Choose A File</span>
        <span className="file-input__name">{file.name}</span>
        <input
          id="gallery-image"
          type="file"
          onChange={imgUpdate}
          ref={inputFile}
          required
          accept=".png,.jpg,.jpeg,.webp,.gif"
        />
      </label>

      <div className="input__wrapper">
        <label htmlFor="gallery-title">Title</label>
        <input
          id="gallery-title"
          type="text"
          name="title"
          onChange={formUpdate}
          value={form.title || ""}
          required
        />
      </div>

      <div className="input__wrapper">
        <label htmlFor="gallery-medium">Medium</label>
        <input
          id="gallery-medium"
          type="text"
          name="medium"
          onChange={formUpdate}
          value={form.medium || ""}
        />
      </div>

      <div className="input__wrapper">
        <label htmlFor="title">Description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          rows="3"
          onChange={formUpdate}
          value={form.description || ""}
        />
      </div>

      <button data-text="Submit" type="submit" disabled={pending}>
        {pending ? (
          <>
            Submitting... <CircularProgress />
          </>
        ) : (
          <>
            Submit
            <PublishIcon />
          </>
        )}
      </button>
    </form>
  )
}

export default GalleryForm
