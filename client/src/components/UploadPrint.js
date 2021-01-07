import React, {useState, useContext} from 'react'
import AppContext from '../context/AppContext'

const UploadPrint = () => {
    const appContext = useContext(AppContext);
    const {uploadPrint} = appContext;

    const [quantity, setQuantity] = useState({
        "eightEleven": 0,
        "oneeightTwofour": 0,
        "fiveEight": 0
    })
    const [form, setForm] = useState({
        title: "",
        quantity: quantity
    })

    const [file, setFile] = useState('');

    const {title} = form;

    const formUpdate = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const imgUpdate = (e) => {
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name)
    }

    const quantChange = (e) => {
        setQuantity({
            ...quantity,
            [e.target.name]: e.target.value
        })
    }

    const upload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file)
        formData.append('title', title)
        formData.append('quantity', JSON.stringify(quantity))

        uploadPrint(formData);
        setQuantity({
            "eightEleven": 0,
            "oneeightTwofour": 0,
            "fiveEight": 0
        })
        setForm({title: "", quantity: quantity})
        setFile("");
        e.target.children[2].value = null;
    }

    return (
        <div className="upload-form prints">
            <h2>Add Art to Gallery</h2>
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

                <label htmlFor="fiveEight" className="quantity">5 x 8</label>
                <input id="fiveEight" type="number" onChange={quantChange} name="fiveEight" value={quantity.fiveEight} className="quantity" />

                <label htmlFor="eightEleven" className="quantity">8.5 x 11</label>
                <input id="eightEleven" type="number" onChange={quantChange} name="eightEleven" value={quantity.eightEleven}  className="quantity"/>

                <label htmlFor="oneeightTwofour" className="quantity">18 x 24</label>
                <input type="number" onChange={quantChange} name="oneeightTwofour" value={quantity.oneeightTwofour} className="quantity" />

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default UploadPrint
