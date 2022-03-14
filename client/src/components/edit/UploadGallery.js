import React, { useState, useContext, useRef } from 'react'
import AppContext from "../../context/AppContext"
import AlertContext from "../../context/alertContext"
import ImagePreview from '../layout/ImagePreview'
import GalleryForm from './GalleryForm'
import axios from 'axios'

const UploadGallery = () => {
    const appContext = useContext(AppContext);
    const alertContext = useContext(AlertContext)
    const {refreshArt} = appContext
    const {setAlert} = alertContext;

    const [form, setForm] = useState({})
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState("")

    const inputFile = useRef()

    // Sets state when form input changes
    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Sets image file to state
    const imgUpdate = (e) => {
        const [imgFile] = e.target.files
        if (imgFile) {
            if (imgFile.size / 1024 / 1024 > 16) {
                setAlert("File is larger than the 16mb max size", "lightpink")
                e.target.value = null;
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
    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file)
        formData.append('title', form.title)
        formData.append("medium", form.medium)
        formData.append('description', form.description)
        formData.append('position', form.position)

        try {
            const res = await axios.post('/upload/gallery', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setAlert(res.data.msg, "lightgrey")
            refreshArt();
        } catch (err) {
            setAlert("There was a problem with the server", "lightred")
        }

        setForm({})
        setFile("")
        setPreview("")
        inputFile.current.value = null
    }

    const updatePosition = (position) => {
        setForm(prev => ({ ...prev, position }))
    }

    return (
        <div className="upload-gallery" onDragOver={e => e.preventDefault()}>
            <h2>Add Artwork to Gallery</h2>
            <div className="upload-form">
                <GalleryForm 
                    form={form} 
                    imgUpdate={imgUpdate} 
                    formUpdate={formUpdate} 
                    upload={upload} 
                    file={file}
                    inputFile={inputFile}
                />
                <ImagePreview
                    src={preview}
                    alt={form.title}
                    transitionKey={file.size}
                    dispatchPosition={updatePosition}
                />
            </div>
        </div>
    )
}

export default UploadGallery
