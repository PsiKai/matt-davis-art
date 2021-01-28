import React, {useContext, useState, useEffect} from 'react'
import AppContext from "../context/AppContext"
import AlertContext from "../context/alertContext"
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress"
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const EditGallery = () => {
    const appContext = useContext(AppContext)
    const alertContext = useContext(AlertContext)
    const {gallery, refreshArt} = appContext
    const {setAlert} = alertContext


    const [artEdit, setArtEdit] = useState({})
    const [newTitle, setNewTitle] = useState({})
    const [edit, setEdit] = useState(false)

    const editArtwork = (e) => {
        var pic = e.target
        setArtEdit({
            key: pic.id,
            src: pic.src,
            title: pic.name,
            alt: pic.name,
            medium: pic.dataset.medium,
            description: pic.dataset.description,
            type: pic.dataset.type
        })
        setEdit(true)
    }

    useEffect(() => {
        setNewTitle(artEdit)
    }, [artEdit])

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
                type: artEdit.type
            },
            new: {
                title: newTitle.title,
                medium: newTitle.medium,
                description: newTitle.description
            }
        }
        const res = await axios.post("/update/gallery", data)
        setAlert(res.data.msg, "lightgrey")
        setNewTitle({})
        setArtEdit({})
        setEdit(false)
        refreshArt()   
    }

    const remove = async () => {
        try {
            const res = await axios.post("/delete/gallery", {name: artEdit.title, type: artEdit.type})
            setAlert(res.data.msg, "lightblue")
            setArtEdit({});
            refreshArt();
        } catch (error) {
            setAlert(error.response.msg, "lightpink")
        }
        
    }

    return (
        <div className="edit-gallery">
            <h2>Edit or Delete Artwork from Gallery</h2>
            <div className="update-gallery">
                {
                gallery ? gallery.map((item, i) => {
                    return (
                    <img 
                        key={i}
                        id={i}
                        className="update-preview"
                        name={item.title}
                        alt={item.title}
                        src={item.img}
                        onClick={editArtwork}
                        data-description={item.description}
                        data-medium={item.medium}
                        data-type={item.type}>
                    </img>)
                    
                }) : 
                    <div className="progress">
                        <CircularProgress color="inherit" />
                    </div>
                }
                
            </div>
            <div className="update-gallery--grid">
                <TransitionGroup className="update-gallery--wrapper">
                    <CSSTransition
                        key={artEdit.key}
                        timeout={400}
                        classNames="fadein"
                    >
                    
                        <div className="update-gallery--form">
                            <img 
                                className="edit-image"
                                name={artEdit && artEdit.name}
                                alt={artEdit && artEdit.alt}
                                src={artEdit && artEdit.src}>
                            </img>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            
                <CSSTransition
                    in={edit}
                    classNames="fadein"
                    timeout={200}
                    unmountOnExit={true}
                >
                        <div className="update-gallery--update">
                                
                            <label htmlFor="update-title">New Title</label>
                            <input 
                                id="update-title" 
                                name="title"
                                type="text" 
                                value={newTitle.title || ""}
                                onChange={setUpdate} />

                            <label htmlFor="update-medium">New Medium</label>
                            <input 
                                id="update-medium" 
                                name="medium"
                                type="text" 
                                value={newTitle.medium || ""}
                                onChange={setUpdate} />

                            <label htmlFor="update-description">New Description</label>
                            <textarea 
                                id="update-description"
                                name="description" 
                                rows="5" 
                                value={newTitle.description || ""} 
                                onChange={setUpdate}
                                />

                            <button data-text="Submit" onClick={submitChanges}>Submit</button>
                            <p style={{textAlign: "center"}}>--OR--</p>
                            <button data-text="Delete" onClick={remove}>Delete</button>
                        </div>
                </CSSTransition>
            </div>
        </div>
    )
}

export default EditGallery
