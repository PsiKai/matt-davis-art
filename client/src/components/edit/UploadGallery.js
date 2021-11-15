import React, {useState, useContext} from 'react'
import AppContext from "../../context/AppContext"
import AlertContext from "../../context/alertContext"
import axios from 'axios'
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const UploadGallery = () => {
    const appContext = useContext(AppContext);
    const alertContext = useContext(AlertContext)
    const {refreshArt} = appContext
    const {setAlert} = alertContext;

    const [form, setForm] = useState({
        title: "",
        medium: "",
        description: ""
    })
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState("")

    const {title, medium, description} = form;

    // Sets state when form input changes
    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Sets image file to state
    const imgUpdate = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].size / 1024 / 1024 > 16) {
                setAlert("File is larger than the 16mb max size", "lightpink")
                e.target.value = null;
            } else {
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
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
        formData.append('title', title)
        formData.append("medium", medium)
        formData.append('description', description)

        try {
            const res = await axios.post('/upload/gallery', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            setAlert(res.data.msg, "lightgrey")
            refreshArt();
        } catch (err) {
            // if(err.response.status === 500) {
                setAlert("There was a problem with the server", "lightred");
            // } else {
            //     setAlert(res.data.msg, "lightred");
            // }
        }
        setForm({title: "", medium: "", description: ""})
        setFile("");
        // setFile("Choose File")
        setPreview("")
        e.target.children[6].value = null
    }

    return (
        <div className="upload-gallery">
            <h2>Add Artwork to Gallery</h2>
            <div className="upload-form">
            
            <form onSubmit={upload}>
                <label className={file ? "file-input__label small-label" : "file-input__label"}>
                    <span>Choose A File</span>
                    <span className="file-input__name">{file.name}</span>
                    <input 
                        id="gallery-image" 
                        type="file" 
                        onChange={imgUpdate}
                        required />
                </label>
                <div className="input__wrapper">
                <label htmlFor="gallery-title">Title</label>
                <input 
                    id="gallery-title" 
                    type="text" 
                    name="title" 
                    onChange={formUpdate} 
                    value={title}
                    required>
                </input>
                </div>

                <div className="input__wrapper">
                <label htmlFor="gallery-medium">Medium</label>
                <input 
                    id="gallery-medium" 
                    type="text" 
                    name="medium" 
                    onChange={formUpdate} 
                    value={medium}
                    required>
                </input>
                </div>

                <div className="input__wrapper">
                <label htmlFor="title">Description</label>
                <textarea 
                    id="description" 
                    type="text" 
                    name="description" 
                    rows="7"
                    onChange={formUpdate}
                    value={description}
                    required>
                </textarea>
                </div>
            
                <button data-text="Submit" type="submit">Submit</button>
                
            </form>
            <TransitionGroup className="img-preview" style={preview !== "" ? {} : {display: "none" }}>
                <CSSTransition
                    key={file.size}
                    timeout={400}
                    classNames="fadein"
                >
                    <img src={preview} alt={form.title} />
                </CSSTransition>
            </TransitionGroup>
        </div>
        </div>
        // </CSSTransition>

    )
}

export default UploadGallery
