import React, { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import AlertContext from "../../context/alertContext"

import axios from "axios"
import { CSSTransition } from "react-transition-group"

import CircularProgress from "@material-ui/core/CircularProgress"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"
import PublishIcon from "@material-ui/icons/Publish"
import DeleteIcon from "@material-ui/icons/Delete"

import ImagePreview from "../layout/ImagePreview"
import EditImgThumbnail from "../layout/EditImgThumbnail"

const EditStore = ({ setUploading }) => {
  const appContext = useContext(AppContext)
  const alertContext = useContext(AlertContext)
  const { prints, refreshArt } = appContext
  const { setAlert } = alertContext

  const [newTitle, setNewTitle] = useState({})
  const [edit, setEdit] = useState(false)
  const [pending, setPending] = useState("")

  const setUpdate = e => {
    if (e.target.name === "width" || e.target.name === "height") {
      setNewTitle({
        ...newTitle,
        dimensions: { ...newTitle["dimensions"], [e.target.name]: +e.target.value },
      })
      return
    }
    setNewTitle({
      ...newTitle,
      [e.target.name]: e.target.value,
    })
  }

  const editArtwork = id => {
    var foundPrint = prints.find(print => print._id === id)
    setNewTitle({ ...foundPrint, dimensions: JSON.parse(foundPrint.dimensions) })
    setEdit(true)
  }

  const submitChanges = async route => {
    setPending(route.substring(1))
    try {
      const res = await axios.post(`${route}/prints`, newTitle)
      setAlert(res.data.msg, "lightgrey")
      setNewTitle({})
      refreshArt()
      setEdit(false)
    } catch (error) {
      setAlert(error.response.data.msg, "lightpink")
    }
    setTimeout(() => setPending(""), 500)
  }

  const makeOriginal = e => {
    e.target.name === "original"
      ? setNewTitle({ ...newTitle, original: true })
      : setNewTitle({ ...newTitle, original: false })
  }

  const updatePosition = position => {
    setNewTitle(prev => ({ ...prev, position }))
  }

  return (
    <div className="edit-gallery" onDragOver={e => e.preventDefault()}>
      <div className="edit-gallery--header">
        <h2>Update Artwork in Store</h2>
        <button className="upload-btn" onClick={() => setUploading("store")}>
          <PublishIcon /> New
        </button>
      </div>
      <h3>Originals</h3>
      <div className="update-gallery">
        {prints ? (
          prints.map((art, i) => {
            if (art.original) {
              return <EditImgThumbnail key={i} artWork={art} editArtwork={editArtwork} />
            } else return null
          })
        ) : (
          <div className="progress">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
      <h3>Prints</h3>
      <div className="update-gallery">
        {prints?.map((art, i) => {
          if (!art.original) {
            return <EditImgThumbnail key={i} artWork={art} editArtwork={editArtwork} />
          } else return null
        })}
      </div>
      <div className="upload-form">
        <CSSTransition in={edit} classNames="fadein" timeout={200} unmountOnExit={true}>
          <div className="backdrop">
            <div className="modal-content edit-modal">
              <div className="modal-header">
                <div className="close-modal" onClick={() => setEdit(false)}>
                  <CloseRoundedIcon />
                </div>
                <h2>Edit this Store piece</h2>
              </div>
              <ImagePreview
                transitionKey={newTitle._id}
                src={newTitle.img}
                alt={newTitle.alt}
                dispatchPosition={updatePosition}
                objectPosition={newTitle.position}
              />

              <div className="update-gallery--update">
                <div className="input__wrapper">
                  <label htmlFor="update-title">New Title</label>
                  <input
                    id="update-title"
                    name="title"
                    type="text"
                    value={newTitle.title || ""}
                    onChange={setUpdate}
                  />
                </div>

                <div className="upload-prints--stock">
                  <div className={newTitle.original ? "radio-group original" : "radio-group"}>
                    <label className="input__wrapper" style={!newTitle.original ? { opacity: "1" } : {}}>
                      <input
                        type="radio"
                        name="prints"
                        value="prints"
                        onChange={() => {}}
                        checked={newTitle.original || false}
                        onClick={makeOriginal}
                      />
                      <span>Print</span>
                    </label>

                    <label className="input__wrapper" style={newTitle.original ? { opacity: "1" } : {}}>
                      <input
                        type="radio"
                        name="original"
                        value="original"
                        checked={newTitle.original || false}
                        onChange={() => {}}
                        onClick={makeOriginal}
                      />
                      <span>Original</span>
                    </label>
                  </div>

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
                        onChange={setUpdate}
                        value={newTitle.dimensions?.width || ""}
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
                        onChange={setUpdate}
                        value={newTitle.dimensions?.height || ""}
                        inputMode="decimal"
                      />
                    </div>

                    <div className="price input__wrapper">
                      <label htmlFor="price">Price: $</label>
                      <input
                        id="price"
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                        name="price"
                        onChange={setUpdate}
                        value={newTitle.price || 0}
                        inputMode="decimal"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={!!pending} onClick={() => submitChanges("/update")}>
                  {pending === "update" ? (
                    <>
                      Submitting... <CircularProgress />
                    </>
                  ) : (
                    <>
                      Submit <PublishIcon />
                    </>
                  )}
                </button>
                <button type="submit" disabled={!!pending} onClick={() => submitChanges("/delete")}>
                  {pending === "delete" ? (
                    <>
                      Deleting... <CircularProgress />
                    </>
                  ) : (
                    <>
                      Delete <DeleteIcon />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default EditStore
