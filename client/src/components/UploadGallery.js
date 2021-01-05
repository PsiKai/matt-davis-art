import React, {useState, useContext} from 'react'
import AppContext from "../context/AppContext"

const UploadGallery = () => {
    const appContext = useContext(AppContext);

    const [form, setForm] = useState({
        title: "",
        description: ""
    })

    const [file, setFile] = useState('');
    // const [fileName, setFileName] = useState("Choose File")

    const {title, description} = form;

    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const imgUpdate = (e) => {
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name)
    }

    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file)
        formData.append('title', title)
        formData.append('description', description)

        appContext.uploadToGallery(formData)
        setForm({title: "", description: ""})
        setFile("");
        setFile("Choose File")
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
                {/* <label htmlFor="image">{fileName}</label> */}
                <input id="image" type="file" onChange={imgUpdate} />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default UploadGallery
