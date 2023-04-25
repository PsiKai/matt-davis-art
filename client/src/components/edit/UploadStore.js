import React, { useState, useContext, useRef } from "react"
import AlertContext from "../../context/alertContext"

import axios from "axios"

import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

import ImagePreview from "../layout/ImagePreview"
import UploadStoreForm from "./UploadStoreForm"

import { useArtRefresh } from "../../hooks/artApi"

const UploadStore = ({ setUploading }) => {
  const { setAlert } = useContext(AlertContext)

  const [file, setFile] = useState("")
  const [preview, setPreview] = useState("")
  const [objectPosition, setObjectPosition] = useState("50% 50%")
  const [pending, setPending] = useState(false)

  const [form, setForm] = useState(initialFormState())

  const refreshArt = useArtRefresh()

  function initialFormState() {
    return {
      title: "",
      original: "print",
      price: "",
      width: 11,
      height: 17,
      objectPosition: "50% 50%",
    }
  }

  const formUpdate = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const inputFile = useRef()

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

  // Uploads new print to database
  const upload = async e => {
    setPending(true)
    e.preventDefault()

    const { title, original, price, width, height } = form
    const priceAdjusted = original === "original" ? price : 15
    const dimensionsAdjusted = original === "original" ? { width, height } : { width: 11, height: 17 }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("original", original === "original")
    formData.append("price", priceAdjusted)
    formData.append("dimensions", JSON.stringify(dimensionsAdjusted))
    formData.append("position", objectPosition)

    try {
      const res = await axios.post("/upload/prints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setAlert(res.data.msg, "lightblue")
      refreshArt()
    } catch (err) {
      setAlert(err.response.data.msg, "lightpink")
    }
    setFile("")
    setPreview("")
    setObjectPosition("50% 50%")
    setForm(initialFormState())
    inputFile.current.value = null
    setPending(false)
    setUploading("")
  }

  return (
    <>
      <div className="modal-header">
        <div className="close-modal" onClick={() => setUploading("")}>
          <CloseRoundedIcon />
        </div>
        <h2>Add Artwork to Store</h2>
      </div>
      <div className="upload-prints" onDragOver={e => e.preventDefault()}>
        <ImagePreview
          src={preview}
          alt={form.title}
          transitionKey={file.size}
          dispatchPosition={setObjectPosition}
          fallback={false}
        />
        <UploadStoreForm
          form={form}
          formUpdate={formUpdate}
          pending={pending}
          upload={upload}
          inputFile={inputFile}
          file={file}
          imgUpdate={imgUpdate}
        />
      </div>
    </>
  )
}

export default UploadStore
