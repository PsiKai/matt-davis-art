import React, {useState, useContext, useEffect} from 'react'
import AppContext from '../context/AppContext'
import AlertContext from "../context/alertContext"
import axios from 'axios'
import { CSSTransition} from 'react-transition-group';

const UploadPrint = () => {
    const alertContext = useContext(AlertContext)
    const appContext = useContext(AppContext);
    const { getArt} = appContext;
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

    const {title} = form;

    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setModalOpen(true)
    }, [])

    // Sets state when form inputs change
    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Sets image file to state
    const imgUpdate = (e) => {
        setFile(e.target.files[0]);
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
            getArt();
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
        e.target.children[2].value = null;
    }

    return (
        <CSSTransition
            in={modalOpen} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
        >
        <div className="upload-form prints">
            <h2>Add Art to Prints</h2>
            <form onSubmit={upload}>

                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    name="title" 
                    onChange={formUpdate} 
                    value={title}>
                </input>

                <input id="image" type="file" onChange={imgUpdate} />

                <label htmlFor="fiveEight" className="stock">5 x 8</label>
                <input 
                    id="fiveEight" 
                    type="number" 
                    onChange={quantChange} 
                    name="fiveEight" 
                    value={stock.fiveEight} 
                    className="stock" 
                />

                <label htmlFor="eightEleven" className="stock">8.5 x 11</label>
                <input 
                    id="eightEleven" 
                    type="number" 
                    onChange={quantChange} 
                    name="eightEleven" 
                    value={stock.eightEleven}  
                    className="stock"
                />

                <label htmlFor="oneeightTwofour" className="stock">18 x 24</label>
                <input 
                    type="number" 
                    onChange={quantChange} 
                    name="oneeightTwofour" 
                    value={stock.oneeightTwofour} 
                    className="stock" 
                />

                <input type="submit" value="Submit" />
            </form>
        </div>
        </CSSTransition>
    )
}

export default UploadPrint
