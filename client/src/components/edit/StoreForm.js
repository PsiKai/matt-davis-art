import React from "react"

import { CSSTransition } from "react-transition-group"

import { CircularProgress } from "@material-ui/core"
import PublishIcon from "@material-ui/icons/Publish"

const StoreForm = ({ form, formUpdate, imgUpdate, upload, file, inputFile, pending }) => {
  return (
    <form onSubmit={upload}>
      <label className={file ? "file-input__label small-label" : "file-input__label"}>
        <span>Choose A File</span>
        <CSSTransition in={!!file.name} timeout={200} classNames="drop-in" unmountOnExit>
          <span className="file-input__name">{file.name}</span>
        </CSSTransition>
        <input
          id="image"
          type="file"
          onChange={imgUpdate}
          ref={inputFile}
          required
          accept=".png,.jpg,.jpeg,.webp,.gif"
        />
      </label>

      <div className="input__wrapper">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" onChange={formUpdate} value={form.title} required></input>
      </div>

      <div className="upload-prints--stock">
        <div className={`radio-group ${form.original}`}>
          <label className="input__wrapper">
            <input
              type="radio"
              name="original"
              value="print"
              checked={form.original === "print"}
              onChange={formUpdate}
            />
            <span>Print</span>
          </label>
          <label className="input__wrapper">
            <input
              type="radio"
              name="original"
              value="original"
              checked={form.original === "original"}
              onChange={formUpdate}
            />
            <span>Original</span>
          </label>
        </div>

        <CSSTransition in={form.original === "original"} timeout={200} classNames="drop-in" unmountOnExit>
          <div className="upload-prints--dimensions">
            <div className="input__wrapper">
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
            </div>
            <div className="input__wrapper">
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
            </div>
            <div className="price input__wrapper">
              <label htmlFor="price">Price: $</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                onChange={formUpdate}
                value={form.price}
                inputMode="decimal"
              />
            </div>
          </div>
        </CSSTransition>
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

export default StoreForm
