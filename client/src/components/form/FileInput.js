import React from "react"

import { CSSTransition } from "react-transition-group"

import FolderOpenIcon from "@material-ui/icons/FolderOpen"

const FileInput = ({ file, onChange, inputFile }) => {
  return (
    <label className={file ? "file-input__label small-label" : "file-input__label"}>
      <input
        id="image"
        type="file"
        onChange={onChange}
        ref={inputFile}
        required
        accept=".png,.jpg,.jpeg,.webp,.gif"
      />
      <span>Choose A File</span>
      <FolderOpenIcon />
      <CSSTransition in={!!file.name} timeout={200} classNames="drop-in" unmountOnExit>
        <span className="file-input__name">{file.name}</span>
      </CSSTransition>
    </label>
  )
}

export default FileInput
