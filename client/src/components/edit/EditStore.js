import React, { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import AlertContext from "../../context/alertContext"

import axios from "axios"
import { CSSTransition } from "react-transition-group"

import CircularProgress from "@material-ui/core/CircularProgress"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"
import PublishIcon from "@material-ui/icons/Publish"

import ImagePreview from "../layout/ImagePreview"
import EditImgThumbnail from "../layout/EditImgThumbnail"
import EditStoreForm from "./EditStoreForm"

const EditStore = ({ setUploading }) => {
  const appContext = useContext(AppContext)
  const alertContext = useContext(AlertContext)
  const { prints, refreshArt } = appContext
  const { setAlert } = alertContext

  const [newTitle, setNewTitle] = useState(initialFormState())
  const [edit, setEdit] = useState(false)
  const [pending, setPending] = useState("")

  function initialFormState() {
    return {
      title: "",
      original: "print",
      price: "",
      width: 11,
      height: 17,
      position: "50% 50%",
    }
  }

  const setUpdate = e => {
    setNewTitle({
      ...newTitle,
      [e.target.name]: e.target.value,
    })
  }

  const editArtwork = id => {
    var foundPrint = prints.find(print => print._id === id)
    setNewTitle({
      ...foundPrint,
      ...JSON.parse(foundPrint.dimensions),
      original: foundPrint.original ? "original" : "print",
    })
    setEdit(true)
  }

  const submitChanges = async route => {
    setPending(route.substring(1))
    const { original, width, height } = newTitle
    const dimensions = { width, height }
    const updatedArt = { ...newTitle, original: original === "original", dimensions }

    try {
      const res = await axios.post(`${route}/prints`, updatedArt)
      setAlert(res.data.msg, "lightgrey")
      refreshArt()
    } catch (error) {
      setAlert(error.response.data.msg, "lightpink")
    }

    setNewTitle(initialFormState())
    setEdit(false)
    setPending("")
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

            <EditStoreForm
              form={newTitle}
              formUpdate={setUpdate}
              pending={pending}
              submitChanges={submitChanges}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default EditStore
