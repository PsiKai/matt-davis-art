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
import EditGalleryForm from "./EditGalleryForm"
import { useArtRefresh } from "../../hooks/artApi"

const EditGallery = ({ setUploading }) => {
  const { gallery } = useContext(AppContext)
  const { setAlert } = useContext(AlertContext)

  const [artEdit, setArtEdit] = useState(initialFormState())
  const [edit, setEdit] = useState(false)
  const [pending, setPending] = useState("")

  const refreshArt = useArtRefresh()

  function initialFormState() {
    return {
      title: "",
      medium: "",
      description: "",
    }
  }

  const editArtwork = id => {
    var foundArt = gallery.find(art => art._id === id)
    setArtEdit({ ...foundArt })
    setEdit(true)
  }

  const setObjectPosition = position => {
    setArtEdit(prev => ({ ...prev, position }))
  }

  const setUpdate = e => {
    setArtEdit(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitChanges = async route => {
    setPending(route.substring(1))

    try {
      const res = await axios.post(`${route}/gallery`, artEdit)
      setAlert(res.data.msg, "lightblue")
      refreshArt()
    } catch (error) {
      console.log(error.response || error)
      setAlert(error.response.data.msg, "lightpink")
    }

    setArtEdit(initialFormState())
    setPending("")
    setEdit(false)
    setUploading("")
  }

  return (
    <div className="edit-gallery" onDragOver={e => e.preventDefault()}>
      <div className="edit-gallery--header">
        <h2>Update Artwork in Gallery</h2>
        <button className="upload-btn" onClick={() => setUploading("gallery")}>
          <PublishIcon /> New
        </button>
      </div>
      <div className="update-gallery">
        {gallery ? (
          gallery.map((item, i) => {
            return <EditImgThumbnail key={i} artWork={item} editArtwork={editArtwork} />
          })
        ) : (
          <div className="progress">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
      <CSSTransition in={edit} classNames="fadein" timeout={200} unmountOnExit={true}>
        <div className="backdrop">
          <div className="modal-content edit-modal">
            <div className="modal-header">
              <div className="close-modal" onClick={() => setEdit(false)}>
                <CloseRoundedIcon />
              </div>
              <h2>Edit this Gallery piece</h2>
            </div>
            <ImagePreview
              transitionKey={artEdit._id}
              src={artEdit.img}
              alt={artEdit.alt}
              dispatchPosition={setObjectPosition}
              objectPosition={artEdit.position}
            />

            <EditGalleryForm
              form={artEdit}
              formUpdate={setUpdate}
              submitChanges={submitChanges}
              pending={pending}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default EditGallery
