import React, {useState, useContext} from 'react'
import AppContext from "../context/AppContext"
import AlertContext from "../context/alertContext"
import axios from 'axios'

const UploadGallery = () => {
    const appContext = useContext(AppContext);
    const alertContext = useContext(AlertContext)
    const {getArt} = appContext
    const {setAlert} = alertContext;

    const [form, setForm] = useState({
        title: "",
        description: ""
    })
    const [file, setFile] = useState('');

    const {title, description} = form;

    // Sets state when form input changes
    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Sets image file to state
    const imgUpdate = (e) => {
        setFile(e.target.files[0]);
    }

    // Uploads image to the database
    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file)
        formData.append('title', title)
        formData.append('description', description)

        try {
            const res = await axios.post('/upload/gallery', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            setAlert(res.data.msg, "lightgrey")
            getArt();
        } catch (err) {
            // if(err.response.status === 500) {
                setAlert("There was a problem with the server", "lightred");
            // } else {
            //     setAlert(res.data.msg, "lightred");
            // }
        }
        setForm({title: "", description: ""})
        setFile("");
        setFile("Choose File")
    }

    return (
        <div className="upload-form">
            <h2>Add Art to Gallery</h2>
            <form onSubmit={upload}>

                <label htmlFor="gallery-title">Title</label>
                <input 
                    id="gallery-title" 
                    type="text" 
                    name="title" 
                    onChange={formUpdate} 
                    value={title}>
                </input>

                <label htmlFor="title">Description</label>
                <textarea 
                    id="description" 
                    type="text" 
                    name="description" 
                    rows="3"
                    onChange={formUpdate}
                    value={description}>
                </textarea>

                <input id="gallery-image" type="file" onChange={imgUpdate} />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default UploadGallery
