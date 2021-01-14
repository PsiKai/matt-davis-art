import React, {Fragment, useContext, useState, useEffect} from 'react'
import AppContext from "../context/AppContext"
import AlertContext from "../context/alertContext"
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress"
import { CSSTransition} from 'react-transition-group';

const EditGallery = () => {
    const appContext = useContext(AppContext)
    const alertContext = useContext(AlertContext)
    const {gallery, getArt} = appContext
    const {setAlert} = alertContext


    const [artEdit, setArtEdit] = useState({})
    const [newTitle, setNewTitle] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(true)
    }, [])

    const editArtwork = (e) => {
        // console.log(e.target.name);
        var pic = e.target
        setNewTitle({})
        setArtEdit({
            src: pic.src,
            title: pic.name,
            alt: pic.name,
            description: pic.dataset.description,
            style: {
                display: "block",
                opacity: "1"
            }
        })
    }
    
    const change = () => {
        setNewTitle(artEdit)
    }

    const setUpdate = (e) => {
        setNewTitle( {
            ...newTitle,
            [e.target.name]: e.target.value
        })
    }

    const submitChanges = async () => {
        const data = {
            old: {
                title: artEdit.title,
            },
            new: {
                title: newTitle.title,
                description: newTitle.description
            }
        }
        const res = await axios.post("update/gallery", data)
        // console.log(res);
        setAlert(res.data.msg, "lightgrey")
        setNewTitle({})
        setArtEdit({})   
    }

    const remove = async () => {
        const res = await axios.post("/delete/gallery", {name: artEdit.title})
        // console.log(res);
        setAlert(res.data.msg, "lightblue")
        setArtEdit({});
        getArt();
    }

    return (
        <CSSTransition
            in={modalOpen} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
        >
        <Fragment>
        <h2>Edit or Delete Artwork from Gallery</h2>
        <div className="update-gallery">
            {
            gallery ? gallery.map((item, i) => {
                var bytes = Buffer.from(item.img.data)
                return (
                <img 
                    key={i}
                    className="update-preview"
                    name={item.title}
                    alt={item.title}
                    src={`data:${item.img.contentType};base64, ${bytes.toString('base64')}`}
                    onClick={editArtwork}
                    data-description={item.description}
                ></img>)
                
            }) : 
                <div className="progress">
                    <CircularProgress color="inherit" />
                </div>
            }
            
        </div>
        <div className="update-gallery--form" style={artEdit && artEdit.style}>
            <img 
                className="edit-image"
                name={artEdit && artEdit.name}
                alt={artEdit && artEdit.alt}
                src={artEdit && artEdit.src}
            ></img>
        
        <button onClick={change}>Update</button>
        <button onClick={remove}>Delete</button>
        </div>

        <div className="update-gallery--update" style={newTitle && newTitle.style}>
            <label htmlFor="update-title">New Title</label>
            <input 
                id="update-title" 
                name="title"
                type="text" 
                value={newTitle.title || ""}
                onChange={setUpdate} />

            <label htmlFor="update-description">New Description</label>
            <textarea 
                id="update-description"
                name="description" 
                rows="3" 
                value={newTitle.description || ""} 
                onChange={setUpdate}
                />

            <button onClick={submitChanges}>Submit Changes</button>
        </div>
        </Fragment>
        </CSSTransition>
    )
}

export default EditGallery
