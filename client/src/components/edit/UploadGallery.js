import React, { useState, useContext, useRef } from "react"
import AlertContext from "../../context/alertContext"
import axios from "axios"

import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

import ImagePreview from "../layout/ImagePreview"
import UploadGalleryForm from "./UploadGalleryForm"

import { useArtRefresh } from "../../hooks/artApi"

const UploadGallery = ({ setUploading }) => {
  const { setAlert } = useContext(AlertContext)

  const [form, setForm] = useState(initialFormState())
  const [preview, setPreview] = useState("")
  const [file, setFile] = useState("")
  const [pending, setPending] = useState(false)

  const inputFile = useRef()
  const refreshArt = useArtRefresh()

  function initialFormState() {
    return {
      title: "",
      medium: "",
      description: "",
      position: "50% 50%",
    }
  }

  // Sets state when form input changes
  const formUpdate = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // Sets image file to state
  const imgUpdate = e => {
    const [imgFile] = e.target.files
    if (imgFile) {
      if (imgFile.size / 1024 / 1024 > 16) {
        setAlert("File is larger than the 16mb max size", "lightpink")
        e.target.value = null
      } else {
        setFile(imgFile)
        setPreview(URL.createObjectURL(imgFile))
      }
    } else {
      setPreview("")
      setFile("")
    }
    e.target.blur()
  }

  // Uploads image to the database
  const upload = async e => {
    setPending(true)
    e.preventDefault()

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", form.title)
    formData.append("medium", form.medium || "")
    formData.append("description", form.description || "")
    formData.append("position", form.position || "50% 50%")

    try {
      const res = await axios.post("/api/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setAlert(res.data.msg, "lightgrey")
      refreshArt()
    } catch (err) {
      setAlert(err.response.data.msg, "lightpink")
    }

    setForm(initialFormState())
    setFile("")
    setPreview("")
    inputFile.current.value = null
    setPending(false)
    setUploading("")
  }

  const updatePosition = position => {
    setForm(prev => ({ ...prev, position }))
  }

  return (
    <>
      <div className="modal-header">
        <div className="close-modal" onClick={() => setUploading("")}>
          <CloseRoundedIcon />
        </div>
        <h2>Add Artwork to Gallery</h2>
      </div>
      <div className="upload-gallery" onDragOver={e => e.preventDefault()}>
        <ImagePreview
          src={preview}
          alt={form.title}
          transitionKey={file.size}
          dispatchPosition={updatePosition}
          fallback={false}
        />
        <UploadGalleryForm
          form={form}
          imgUpdate={imgUpdate}
          formUpdate={formUpdate}
          upload={upload}
          file={file}
          inputFile={inputFile}
          pending={pending}
        />
      </div>
    </>
  )
}

export default UploadGallery
