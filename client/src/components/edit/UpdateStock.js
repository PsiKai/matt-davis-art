import React, { useContext, useState, useRef } from 'react'
import AppContext from "../../context/AppContext"
import AlertContext from "../../context/alertContext"
import CircularProgress from "@material-ui/core/CircularProgress"

import { CSSTransition, TransitionGroup} from 'react-transition-group';
import axios from "axios"

const UpdateStock = () => {
    const appContext = useContext(AppContext)
    const alertContext = useContext(AlertContext)
    const {prints, refreshArt} = appContext
    const {setAlert} = alertContext

    const [artEdit, setArtEdit] = useState({})
    const [newTitle, setNewTitle] = useState({})
    const [edit, setEdit] = useState(false)

    const updateForm = useRef()

    const setUpdate = (e) => {
        if (e.target.name === "width" || e.target.name === "height") {
            setNewTitle({
                ...newTitle, 
                "dimensions": {...newTitle["dimensions"], [e.target.name]: +e.target.value}})
            return
        }
        setNewTitle( {
            ...newTitle,
            [e.target.name]: e.target.value
        })
    }

    const editArtwork = (e) => {
        var pic = e.target
        setNewTitle({
            _id: pic.id,
            src: pic.src,
            title: pic.alt,
            alt: pic.alt,
            price: pic.dataset.price,
            original: JSON.parse(pic.dataset.original),
            type: pic.dataset.type,
            dimensions: {
                height: +pic.dataset.height,
                width: +pic.dataset.width
            }
        })
        setArtEdit({
            _id: pic.id,
            src: pic.src,
            title: pic.alt
        })
        setEdit(true)
        const y = updateForm.current.getBoundingClientRect().top - 100
        window.scrollBy({top: y, behavior: "smooth"})
    }

    const submitChanges = async () => {
        const data = {
            old: artEdit,
            new: newTitle
        }
        try {
            const res = await axios.post("/update/stock", data)
            setAlert(res.data.msg, "lightgrey")
            setNewTitle({})
            setArtEdit({})
            refreshArt() 
            setEdit(false)
        } catch (error) {
            setAlert(error.response.msg, "lightpink")
        }
    }

    const remove = async () => {
        try {
            const res = await axios.post("/delete/prints", artEdit)
            setAlert(res.data.msg, "lightblue")
            setArtEdit({});
            setNewTitle({})
            refreshArt();
            setEdit(false)
        } catch (error) {
            setAlert(error.response.msg, "lightpink")
        } 
    }

    const makeOriginal = (e) => {
        e.target.name === "original" ? 
            setNewTitle({...newTitle, original: true}) 
            : 
            setNewTitle({...newTitle, original: false})
    }
    
    return (
        <div className="edit-gallery">
            <h2>Update Artwork in Store</h2>
            <h3>Originals</h3>
            <div className="update-gallery">
                {prints ? prints.map((art, i) => {
                    if (art.original) {
                    const size = JSON.parse(art.dimensions)
                     return (
                        <img 
                            key={i}
                            id={art._id}
                            className="update-preview"
                            src={art.img}
                            alt={art.title}
                            data-height={size.height}
                            data-width={size.width}
                            data-price={art.price}
                            data-type={art.type}
                            data-sold-out={art.soldOut}
                            data-original={art.original}
                            onClick={editArtwork}  
                        />
                    )} else return null
                }) :
                <div className="progress">
                    <CircularProgress color="inherit" />
                </div>
                }  
            </div>
            <h3>Prints</h3>
            <div className="update-gallery">
                {prints && prints.map((art, i) => {
                    if (!art.original) {
                        const size = JSON.parse(art.dimensions)
                        return (
                            <img 
                                key={i}
                                id={art._id}
                                className="update-preview"
                                src={art.img}
                                alt={art.title}
                                data-height={size.height}
                                data-width={size.width}
                                data-price={art.price}
                                data-type={art.type}
                                data-sold-out={art.soldOut}
                                data-original={art.original}
                                onClick={editArtwork}  
                            />
                        )
                    } else return null
                })}
            </div>
            <div className="update-gallery--grid" ref={updateForm}>
                <TransitionGroup className="update-gallery--wrapper">
                    <CSSTransition
                        key={artEdit._id}
                        timeout={400}
                        classNames="fadein"
                    >          
                        <div className="update-gallery--form">
                            <img 
                                className="edit-image"
                                name={newTitle && newTitle.name}
                                alt={newTitle && newTitle.alt}
                                src={newTitle && newTitle.src}>
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
                        <div className="input__wrapper">
                            <label htmlFor="update-title">New Title</label>
                            <input 
                                id="update-title" 
                                name="title"
                                type="text" 
                                value={newTitle.title || ""}
                                onChange={setUpdate} />
                        </div>

                        <div className="upload-prints--stock">
                            <div className={newTitle.original ? "radio-group original" : "radio-group"}>
                                <label 
                                    className="input__wrapper" 
                                    style={!newTitle.original ? {opacity: "1"}: {}}
                                >
                                    <input 
                                        type="radio" 
                                        name="print"
                                        onChange={() => {}}
                                        checked={newTitle.original || true}
                                        onClick={makeOriginal}
                                    />
                                    <span>Print</span>
                                </label>

                                <label 
                                    className="input__wrapper" 
                                    style={artEdit.original ? {opacity: "1"} : {}}
                                >
                                    <input 
                                        type="radio" 
                                        name="original"
                                        checked={newTitle.original || false} 
                                        onChange={() => {}}
                                        onClick={makeOriginal}
                                    />
                                    <span>Original</span>
                                </label>
                            </div>

                            <div className="upload-prints--dimensions">
                                <div className="input__wrapper">
                                    <label htmlFor="width">Width:</label>
                                    <input 
                                        id="width" 
                                        name="width"
                                        type="number" 
                                        min="0.0" 
                                        max="100.0" 
                                        step="0.5" 
                                        onChange={setUpdate}
                                        value={newTitle.dimensions ? newTitle.dimensions.width : 0}
                                        inputMode="decimal"
                                    />
                                </div>

                                <div className="input__wrapper">
                                    <label htmlFor="height">Height:</label>
                                    <input 
                                        id="height"
                                        name="height" 
                                        type="number" 
                                        min="0.0" 
                                        max="100.0" 
                                        step="0.5" 
                                        onChange={setUpdate}
                                        value={newTitle.dimensions ? newTitle.dimensions.height : 0}
                                        inputMode="decimal"
                                    />
                                </div>

                                <div className="price input__wrapper">
                                    <label htmlFor="price">Price: $</label>
                                    <input 
                                        id="price" 
                                        type="number" 
                                        min="0.00" 
                                        max="10000.00" 
                                        step="0.01" 
                                        name="price"
                                        onChange={setUpdate}
                                        value={newTitle.price || 0}
                                        inputMode="decimal"
                                        />
                                </div>
                            </div>
                        </div>
                        
                        <button data-text="Submit" onClick={submitChanges}>Submit</button>
                        <p style={{textAlign: "center"}}>--OR--</p>
                        <button data-text="Delete" onClick={remove}>Delete</button>
                    </div>
                </CSSTransition>
            </div>
        </div>
    )       
}

export default UpdateStock
