import React, {useState, useContext, useRef} from 'react'
import AppContext from '../../context/AppContext'
import AlertContext from "../../context/alertContext"
import ImagePreview from '../layout/ImagePreview'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group';

const UploadPrint = () => {
    const { setAlert } = useContext(AlertContext)
    const { refreshArt } = useContext(AppContext);

    const [original, setOriginal] = useState(false);
    const [price, setPrice] = useState("")
    const [dimensions, setDimensions] = useState({width: 11, height: 17})
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('')
    const [objectPosition, setObjectPosition] = useState("50% 50%")

    const inputFile = useRef()

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    // Sets image file to state
    const imgUpdate = (e) => {
        const [imgFile] = e.target.files
        if (imgFile) {
            if (imgFile.size / 1024 / 1024 > 16) {
                setAlert("File is larger than the 16mb max size", "lightpink")
                e.target.value = null;
            } else {
            setFile(imgFile)
            setPreview(URL.createObjectURL(imgFile))
            }
        } else {
            setPreview("")
            setFile("")
        }
        e.target.blur()
    }

    // Indicates original artwork 
    const makeOriginal = (e) => {
        e.target.value === "original" ? setOriginal(true) : setOriginal(false)
    }

    // Set Price of Original art 
    const updatePrice = (e) => {
        setPrice(e.target.value)
    }

    // Set dimensions of original art
    const updateDimensions = (e) => {
        setDimensions({
            ...dimensions,
            [e.target.name]: e.target.value
        })
    }

    // Uploads new print to database
    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file)
        formData.append('title', title)
        formData.append('original', original)
        if (original) {
            formData.append('price', price)
            formData.append("dimensions", JSON.stringify(dimensions))
        } else {
            formData.append("price", 15)
            formData.append("dimensions", JSON.stringify({width: 11, height: 17}))
        }
        formData.append("position", objectPosition)

        try {
            const res = await axios.post("/upload/prints", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            setAlert(res.data.msg, "lightblue")
            refreshArt();
        } catch (err) {
            setAlert(err.response.data.msg, "lightred")
        }

        setOriginal(false)
        setTitle("")
        setFile("")
        setPreview("")
        setPrice("")
        setDimensions({width: 11, height: 17})
        setObjectPosition("50% 50%")
        inputFile.current.value = null;
    }

    return (
        <div className="upload-prints" onDragOver={e => e.preventDefault()}>
            <h2>Add Artwork to Store</h2>
            <div className="upload-form prints">
                <form onSubmit={upload}>
                    <label className={file ? "file-input__label small-label" : "file-input__label"}>
                        <span>Choose A File</span>
                        <CSSTransition
                            in={!!file.name}
                            timeout={200}
                            classNames="drop-in"
                            unmountOnExit
                        >
                            <span className="file-input__name">{file.name}</span>
                        </CSSTransition>
                        <input id="image" type="file" onChange={imgUpdate} ref={inputFile} required/>
                    </label>

                    <div className="input__wrapper">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            onChange={updateTitle}
                            value={title}
                            required>
                        </input>
                    </div>

                    <div className="upload-prints--stock">
                        <div className={original ? "radio-group original" : "radio-group"}>
                            <label className="input__wrapper" style={!original ? {opacity: "1"}: {}}>
                                <input type="radio" value="prints" onClick={makeOriginal}/>
                                <span>Print</span>
                            </label>
                            <label className="input__wrapper" style={original ? {opacity: "1"} : {}}>
                                <input type="radio" value="original" onClick={makeOriginal}/>
                                <span>Original</span>
                            </label>
                        </div>
                        <CSSTransition
                            in={original}
                            timeout={200}
                            classNames="drop-in"
                            unmountOnExit
                        >
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
                                        onChange={updateDimensions}
                                        value={dimensions.width}
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
                                        onChange={updateDimensions}
                                        value={dimensions.height}
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
                                        onChange={updatePrice}
                                        value={price}
                                        inputMode="decimal"
                                    />
                                </div>
                            </div>
                        </CSSTransition>
                    </div>
                    <button data-text="Submit" type="submit">Submit</button>
                </form>
                <CSSTransition
                    in={!!preview}
                    unmountOnExit
                    timeout={0}
                >
                    <ImagePreview
                        transitionKey={file.size}
                        src={preview} alt={title}
                        dispatchPosition={setObjectPosition}
                    />
                </CSSTransition>
            </div>
        </div>
    )
}

export default UploadPrint
