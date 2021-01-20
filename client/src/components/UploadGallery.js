import React, {useState, useContext, useEffect} from 'react'
import AppContext from "../context/AppContext"
import AlertContext from "../context/alertContext"
import axios from 'axios'
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const UploadGallery = () => {
    const appContext = useContext(AppContext);
    const alertContext = useContext(AlertContext)
    const {refreshArt} = appContext
    const {setAlert} = alertContext;

    const [form, setForm] = useState({
        title: "",
        description: ""
    })
    const [preview, setPreview] = useState("");
    const [modalOpen, setModalOpen] = useState(false)
    const [file, setFile] = useState("")

    const {title, description} = form;

    useEffect(() => {
        setModalOpen(true)
    }, [])

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
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        } else {
            setPreview("")
            setFile("")
        }
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
            refreshArt();
        } catch (err) {
            // if(err.response.status === 500) {
                setAlert("There was a problem with the server", "lightred");
            // } else {
            //     setAlert(res.data.msg, "lightred");
            // }
        }
        setForm({title: "", description: ""})
        setFile("");
        // setFile("Choose File")
        setPreview("")
        e.target.children[4].value = null
    }

    return (
        <CSSTransition
            in={modalOpen} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
        >
        <div className="upload-gallery">
            <h2>Add Art to Gallery</h2>
            <div className="upload-form">
            
            <form onSubmit={upload}>

                <label htmlFor="gallery-title">Title</label>
                <input 
                    id="gallery-title" 
                    type="text" 
                    name="title" 
                    onChange={formUpdate} 
                    value={title}
                    required>
                    
                </input>

                <label htmlFor="title">Description</label>
                <textarea 
                    id="description" 
                    type="text" 
                    name="description" 
                    rows="9"
                    onChange={formUpdate}
                    value={description}
                    required>
                </textarea>
                
                <input 
                    id="gallery-image" 
                    type="file" 
                    onChange={imgUpdate}
                    required />
            
                <button type="submit">Submit</button>
                
            </form>
            <TransitionGroup className="img-preview">
                <CSSTransition
                    key={file.size}
                    // in={preview.in}
                    timeout={300}
                    classNames="fadein"
                >
                    <img src={preview} alt={form.title} />
                </CSSTransition>
            </TransitionGroup>
        </div>
        </div>
        </CSSTransition>

    )
}

export default UploadGallery
