import React, {useContext, useState, useRef, useEffect} from 'react'
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
    // const [dimensions, setDimensions] = useState({})

    const updateForm = useRef()

    useEffect(() => {
        setNewTitle(artEdit)
    }, [artEdit])

    console.log(newTitle.dimensions);

    const setUpdate = (e) => {
        console.log(e.target.value);
        if (e.target.name === "width" || e.target.name === "height") {
            setNewTitle({
                ...newTitle, 
                ["dimensions"]: {...newTitle["dimensions"], [e.target.name]: +e.target.value}})
            return
        }
        setNewTitle( {
            ...newTitle,
            [e.target.name]: e.target.value
        })
    }

    // const updateDimensions = (e) => {
    //     setDimensions({
    //         ...dimensions,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const editArtwork = (e) => {
        var pic = e.target
        setArtEdit({
            key: pic.id,
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
        // setDimensions({
        //     width: pic.dataset.width,
        //     height: pic.dataset.height
        // })
        setEdit(true)
        // const y = updateForm.current.getBoundingClientRect().top - 100
        // window.scrollBy({top: y, behavior: "smooth"})
    }

    // const [stock, setStock] = useState([])
    // const [checked, setChecked] = useState([])

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
        refreshArt() 
        setNewTitle({})
        setArtEdit({})
        setEdit(false)
    }

    const remove = async () => {
        try {
            const res = await axios.post("/delete/gallery", {name: artEdit.title, type: artEdit.type})
            setAlert(res.data.msg, "lightblue")
            setArtEdit({});
            refreshArt();
            setEdit(false)
        } catch (error) {
            setAlert(error.response.msg, "lightpink")
        } 
    }

    const makeOriginal = (e) => {
        // console.log(e.target.value);
        e.target.name === "original" ? 
            setNewTitle({...newTitle, original: true}) 
            : 
            setNewTitle({...newTitle, original: false})
    }

    // useEffect(() => {
    //     prints && prints.forEach(print => {
    //         setStock(stock => [
    //             ...stock,
    //             {title: print.title,
    //             stock: print.stock}
    //         ]) 
    //     })
    // }, [prints])

    //changes state of stock on input change
    // const update = (e) => {
    //     var newStock = [...stock]
    //     var title = e.target.name
    //     var stockItem = e.target.id
    //     var newValue = e.target.value
        
    //     newStock.filter(item => {
    //         if (item.title === title) {
    //             return item.stock = {
    //                 ...item.stock,
    //                 [stockItem]: newValue
    //             }
    //         } return item
    //     })
    //     setStock(newStock)  
    // }

    //sends stock changes to database
    // const sendChanges = async () => {
    //     const res = await axios.post("/update/stock", stock);
    //     setAlert(res.data.msg, "lightgreen")
    //     refreshArt();
    // }   
    
    // saves checked prints in state 
    // const stageDelete = (e) => {
    //     if (e.target.checked) {
    //         setChecked([...checked, {
    //             title: e.target.value,
    //             type: e.target.name
    //             }
    //         ])
    //     } else {
    //         var items = [...checked]
    //         const newArray = items.filter(item => {
    //             return item.title !== e.target.value
    //         })
    //         setChecked(newArray)
    //     }
    // }
    
    // deletes selected prints from database 
    // const deletePrints = async () => {
    //     try {
    //         const res = await axios.post("/delete/prints", checked)
    //         setAlert(res.data.msg, "var(--medium)")
            
    //     } catch (err) {
    //         setAlert(err.response.msg, "var(--medium)")
    //     }
    //     var checkboxes = document.querySelectorAll("input[type='checkbox']");
    //         checkboxes.forEach(box => {
    //             if (box.checked) {box.checked = false}
    //         })
    //     setChecked([])
    //     refreshArt();
    // }
    
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
                        <div className="input__wrapper">
                            <label htmlFor="update-title">New Title</label>
                            <input 
                                id="update-title" 
                                name="title"
                                type="text" 
                                value={newTitle.title || ""}
                                onChange={setUpdate} />
                        </div>

                        {/* <div className="input__wrapper">
                            <label htmlFor="update-medium">New Medium</label>
                            <input 
                                id="update-medium" 
                                name="medium"
                                type="text" 
                                value={newTitle.medium || ""}
                                onChange={setUpdate} />
                        </div> */}
                        <div className="upload-prints--stock">
                        <div className={newTitle.original ? "radio-group original" : "radio-group"}>
                        <label 
                            className="input__wrapper" 
                            style={!newTitle.original ? {opacity: "1"}: {}}
                        >
                            <input 
                                type="radio" 
                                name="print"
                                // value={false} 
                                onChange={makeOriginal}
                                checked={newTitle.original}
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
                                // value={true}
                                checked={newTitle.original} 
                                onChange={makeOriginal}
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
                                value={newTitle && newTitle.dimensions.width}
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
                                value={newTitle && newTitle.dimensions.height}
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
                                value={newTitle.price}
                                inputMode="decimal"
                                />
                        </div>
                        </div>
                        </div>
                        {/* <div className="input__wrapper">
                            <label htmlFor="update-description">New Description</label>
                            <textarea 
                                id="update-description"
                                name="description" 
                                rows="5" 
                                value={newTitle.description || ""} 
                                onChange={setUpdate}
                                />
                        </div> */}
                        
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
