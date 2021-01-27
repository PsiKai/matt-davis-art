import React, {useState, useContext} from 'react'
import AppContext from '../context/AppContext'
import AlertContext from "../context/alertContext"
import axios from 'axios'
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const UploadPrint = () => {
    const alertContext = useContext(AlertContext)
    const appContext = useContext(AppContext);
    const {refreshArt} = appContext;
    const {setAlert} = alertContext;

    const [stock, setStock] = useState({
        "eightEleven": 0,
        "oneeightTwofour": 0,
        "fiveEight": 0
    })
    const [form, setForm] = useState({
        title: "",
        stock: stock
    })
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
    }

    // Sets the number of prints to state
    const quantChange = (e) => {
        setStock({
            ...stock,
            [e.target.name]: e.target.value
        })
    }

    // Uploads new print to database
    const upload = async (e) => {
        e.preventDefault();
        console.log(e.target.children);
        const formData = new FormData();
        formData.append("file", file)
        formData.append('title', title)
        formData.append('stock', JSON.stringify(stock))

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
        setStock({
            "eightEleven": 0,
            "oneeightTwofour": 0,
            "fiveEight": 0
        })
        setForm({title: "", stock: stock})
        setFile("");
        // setFile("Choose File")
        setPreview("")
        e.target.children[4].value = null;
    }

    return (
        <div className="upload-prints">
        <h2>Add Art to Prints</h2>
        <div className="upload-form prints">
            
            <form onSubmit={upload}>

                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    name="title" 
                    onChange={formUpdate} 
                    value={title}
                    required>
                </input>

                
                {/* <ul>
                    <li> */}
                    <label htmlFor="prints-stock">Number of Prints</label>
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
                    {/* </li>
                    <li> */}
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
                    {/* </li>
                    <li> */}
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
                        </div>
                        <input id="image" type="file" onChange={imgUpdate} required/>
                    {/* </li>
                </ul> */}
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
