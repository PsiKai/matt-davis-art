import React, {useState, useContext, Fragment, useRef} from 'react'
import AppContext from '../context/AppContext'
import AlertContext from "../context/alertContext"
import axios from 'axios'
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const UploadPrint = () => {
    const alertContext = useContext(AlertContext)
    const appContext = useContext(AppContext);
    const {refreshArt} = appContext;
    const {setAlert} = alertContext;

    // const [stock, setStock] = useState({
    //     "eightEleven": 0,
    //     "oneeightTwofour": 0,
    //     "fiveEight": 0
    // })
    const [original, setOriginal] = useState(false);
    const [price, setPrice] = useState("")
    const [dimensions, setDimensions] = useState({width: 11, height: 17})
    const [title, setTitle] = useState('')
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('')

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

    // Sets the number of prints to state
    // const quantChange = (e) => {
    //     setStock({
    //         ...stock,
    //         [e.target.name]: e.target.value
    //     })
    // }

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
        // formData.append('stock', JSON.stringify(stock))
        formData.append('original', original)
        if (original) {
            formData.append('price', price)
            formData.append("dimensions", JSON.stringify(dimensions))
        } else {
            formData.append("price", 15)
            formData.append("dimensions", {"width": "11", "height": "17"})
        }
        try {
            const res = await axios.post("/upload/prints", formData, {
                header: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setAlert(res.data.msg, "lightblue")
            refreshArt();
        } catch (err) {
            setAlert(err.response.data.msg, "lightred")
        }
        // setStock({
        //     "eightEleven": 0,
        //     "oneeightTwofour": 0,
        //     "fiveEight": 0
        // })
        setOriginal(false)
        setTitle("")
        setFile("");
        setPreview("")
        setPrice("")
        setDimensions({width: 11, height: 17})
        inputFile.current.value = null;
    }

    return (
        <div className="upload-prints">
        <h2>Add Artwork to Store</h2>
        <div className="upload-form prints">
            
            <form onSubmit={upload}>
                <label className={file ? "file-input__label small-label" : "file-input__label"}>
                    <span>Choose A File</span>
                    <span className="file-input__name">{file.name}</span>
                    <input id="image" type="file" onChange={imgUpdate} ref={inputFile} required/>
                </label>

                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    name="title" 
                    onChange={updateTitle} 
                    value={title}
                    required>
                </input>

                <div className="upload-prints--stock">
                    <div className={original ? "radio-group original" : "radio-group"}>
                        <label>
                            <input type="radio" value="prints" onClick={makeOriginal}/>
                            <span>Print</span>
                        </label>
                        <label>
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
                        
                        <div>
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
                        <div>
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
                        <div className="price">
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
                {/* <label htmlFor="prints-stock">Number of Prints</label>
                <div id="prints-stock" className="upload-prints--stock">
                    <div>
                        <label htmlFor="fiveEight" className="stock">5 x 8: </label>
                        <input 
                            id="fiveEight" 
                            type="number" 
                            onChange={quantChange} 
                            name="fiveEight" 
                            value={stock.fiveEight} 
                            className="stock" 
                            min="0"  
                            inputMode="numeric"
                        />
                    </div>
            
                    <div>
                        <label htmlFor="eightEleven" className="stock">8.5 x 11: </label>
                        <input 
                            id="eightEleven" 
                            type="number" 
                            onChange={quantChange} 
                            name="eightEleven" 
                            value={stock.eightEleven}  
                            className="stock"
                            min="0" 
                            inputMode="numeric" 
                        />
                    </div>
              
                    <div>
                        <label htmlFor="oneeightTwofour" className="stock">18 x 24: </label>
                        <input 
                            type="number" 
                            onChange={quantChange} 
                            name="oneeightTwofour" 
                            value={stock.oneeightTwofour} 
                            className="stock"
                            min="0" 
                            inputMode="numeric"
                        />
                    </div>
                </div> */}
          
                <button data-text="Submit" type="submit">Submit</button>
            </form>
            <TransitionGroup className="img-preview" style={preview !== "" ? {} : {display: "none" }}>
                <CSSTransition
                    key={file.size}
                    // in={preview.in}
                    timeout={400}
                    classNames="fadein"
                >
                    <img src={preview} alt={title} />
                </CSSTransition>
            </TransitionGroup>
        </div>
        </div>
    )
}

export default UploadPrint
