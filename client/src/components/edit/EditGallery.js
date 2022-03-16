import React, {useContext, useState, useRef, useEffect} from 'react'
import AppContext from "../../context/AppContext"
import AlertContext from "../../context/alertContext"

import axios from "axios";
import { CSSTransition } from 'react-transition-group';

import CircularProgress from "@material-ui/core/CircularProgress"
import ImagePreview from '../layout/ImagePreview';

const EditGallery = () => {
    const { gallery, refreshArt } = useContext(AppContext)
    const { setAlert } = useContext(AlertContext)

    const [artEdit, setArtEdit] = useState({})
    const [edit, setEdit] = useState(false)
    const [pending, setPending] = useState("")

    const updateForm = useRef()

    const editArtwork = (e) => {
        var foundArt = gallery.find(art => art._id === e.target.id)
        setArtEdit({ ...foundArt })
        setEdit(true)
        const y = updateForm.current.getBoundingClientRect().top - 100
        window.scrollBy({top: y, behavior: "smooth"})
    }

    const setObjectPosition = (position) => {
        setArtEdit(prev => ({ ...prev, position }))
    }

    const setUpdate = (e) => {
        setArtEdit(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const submitChanges = async (route) => {
        setPending(route.substring(1))
        try {
            const res = await axios.post(`${route}/gallery`, artEdit)
            setAlert(res.data.msg, "lightblue")
            setEdit(false)
            setArtEdit({})
            refreshArt()
        } catch (error) {
            console.log(error.response);
            setAlert(error.response.data.msg, "lightpink")
        }
        setTimeout(() => setPending(""), 500)
    }

    return (
        <div className="edit-gallery" onDragOver={e => e.preventDefault()}>
            <h2>Update Artwork in Gallery</h2>
            <div className="update-gallery">
                {gallery ?
                    gallery.map((item, i) => {
                        return (
                            <img
                                key={i}
                                id={item._id}
                                className="update-preview"
                                name={item.title}
                                alt={item.title}
                                src={item.img}
                                onClick={editArtwork}
                                style={{ objectPosition: item.position }}
                            />
                        )
                    })
                    :
                    <div className="progress">
                        <CircularProgress color="inherit" />
                    </div>
                }
            </div>
            <div className="upload-form" ref={updateForm}>
                <CSSTransition
                    in={edit}
                    classNames="fadein"
                    timeout={200}
                    unmountOnExit={true}
                ><>
                    <ImagePreview 
                        transitionKey={artEdit._id}
                        src={artEdit.img}
                        alt={artEdit.alt}
                        dispatchPosition={setObjectPosition}
                        objectPosition={artEdit.position}
                    />
            
                    <div className="update-gallery--update">
                        <div className="input__wrapper">
                            <label htmlFor="update-title">New Title</label>
                            <input 
                                id="update-title" 
                                name="title"
                                type="text" 
                                value={artEdit.title || ""}
                                onChange={setUpdate}
                            />
                        </div>

                        <div className="input__wrapper">
                            <label htmlFor="update-medium">New Medium</label>
                            <input 
                                id="update-medium" 
                                name="medium"
                                type="text" 
                                value={artEdit.medium || ""}
                                onChange={setUpdate}
                            />
                        </div>

                        <div className="input__wrapper">
                            <label htmlFor="update-description">New Description</label>
                            <textarea 
                                id="update-description"
                                name="description" 
                                rows="5" 
                                value={artEdit.description || ""} 
                                onChange={setUpdate}
                            />
                        </div>

                        <button data-text="Submit" type="submit" disabled={pending === "update"} onClick={() => submitChanges("/update")}>
                            {pending === "update" ? <>Submitting... <CircularProgress/></> : "Submit"}
                        </button>
                        <p style={{textAlign: "center"}}>--OR--</p>
                        <button data-text="Submit" type="submit" disabled={pending === "delete"} onClick={() => submitChanges("/delete")}>
                            {pending === "delete" ? <>Deleting... <CircularProgress/></> : "Delete"}
                        </button>
                    </div>
                </></CSSTransition>
            </div>
        </div>
    )
}

export default EditGallery
