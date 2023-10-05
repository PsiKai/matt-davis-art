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

  const [editForm, setEditForm] = useState(initialFormState())
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
    setEditForm({ ...foundArt })
    setEdit(true)
  }

  const setObjectPosition = position => {
    setEditForm(prev => ({ ...prev, position }))
  }

  const updateForm = e => {
    setEditForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitChanges = async action => {
    setPending(action)
    try {
      let res
      if (action === "DELETE") {
        res = await axios.delete(`/api/gallery/${editForm._id}`)
      } else if (action === "PATCH") {
        res = await axios.patch(`api/gallery/${editForm._id}`, editForm)
      } else {
        return console.log(`Action ${action} not recognized`)
      }
      setAlert(res?.data?.msg, "lightblue")
      refreshArt()
    } catch (error) {
      console.log(error.response || error)
      setAlert(error.response?.data?.msg, "lightpink")
    }

    setEditForm(initialFormState())
    setPending("")
    setEdit(false)
    setUploading("")
  }

  return (
    <div className="edit-gallery">
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
              transitionKey={editForm._id}
              src={editForm.img}
              alt={editForm.alt}
              dispatchPosition={setObjectPosition}
              objectPosition={editForm.position}
            />

            <EditGalleryForm
              form={editForm}
              formUpdate={updateForm}
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
