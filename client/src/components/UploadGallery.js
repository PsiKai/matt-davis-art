import React, {useState} from 'react'
import axios from 'axios';

const UploadGallery = () => {
    const [form, setForm] = useState({
        title: "",
        img: "",
        description: ""
    })

    const {title, description} = form;

    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }



    const upload = async (e) => {
        e.preventDefault()
        const res = await axios.post("/upload/gallery", {form: form})
        window.alert(res.data);
        setForm({title: "", img: "", description: ""})
    }

    return (
        <div className="upload-form">
            <h2>Add Art to Gallery</h2>
            <form onSubmit={upload}>

                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
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

                <input name="img" type="file" onChange={formUpdate}></input>

                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default UploadGallery
