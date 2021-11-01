import React, {useState, useContext, Fragment} from 'react'
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
    const [form, setForm] = useState({title: ""})
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('')

    const {title} = form;

    // Sets state when form inputs change
    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Sets image file to state
    const imgUpdate = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].size / 1024 / 1024 > 16) {
                setAlert("File is larger than the 16mb max size", "lightpink")
                e.target.value = null;
            } else {
            setFile(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
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
        e.target.checked ? setOriginal(true) : setOriginal(false)
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
        original ? 
            formData.append('price', price) : 
            formData.append("price", 15)
        formData.append("dimensions", JSON.stringify(dimensions))

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
        setForm({title: "", original: original})
        setFile("");
        // setFile("Choose File")
        setPreview("")
        setPrice("")
        setDimensions({width: 11, height: 17})
        var checkbox = document.querySelector("input[type='checkbox']");
        checkbox.checked = false
        e.target.children[3].value = null;
    }

    return (
        <div className="upload-prints">
        <h2>Add Artwork to Store</h2>
        <div className="upload-form prints">
            
            <form onSubmit={upload}>
                <label className={file ? "file-input__label small-label" : "file-input__label"}>
                    <span>Choose A File</span>
                    <span className="file-input__name">{file.name}</span>
                    <input id="image" type="file" onChange={imgUpdate} required/>
                </label>

                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    name="title" 
                    onChange={formUpdate} 
                    value={title}
                    required>
                </input>

                <div className="upload-prints--stock" style={original ? {justifyContent: "space-between"} : {}}>
                    <div>
                        <label htmlFor="original">Original Art?</label>
                        <input id="original" type="checkbox" onChange={makeOriginal}></input>
                    </div>
                    {original &&
                        <Fragment>
                        
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
                        </Fragment>
                    }
                    
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
                    <img src={preview} alt={form.title} />
                </CSSTransition>
            </TransitionGroup>
        </div>
        </div>
    )
}

export default UploadPrint
