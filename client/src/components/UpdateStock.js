import React, {useContext, useState} from 'react'
import AppContext from "../context/AppContext"
import AlertContext from "../context/alertContext"
import CircularProgress from "@material-ui/core/CircularProgress"
import axios from "axios"

const UpdateStock = () => {
    const appContext = useContext(AppContext)
    const alertContext = useContext(AlertContext)
    const {prints, refreshArt} = appContext;
    const {setAlert} = alertContext;

    // const [stock, setStock] = useState([])
    const [checked, setChecked] = useState([])



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
    const stageDelete = (e) => {
        if (e.target.checked) {
            setChecked([...checked, {
                title: e.target.value,
                type: e.target.name
                }
            ])
        } else {
            var items = [...checked]
            const newArray = items.filter(item => {
                return item.title !== e.target.value
            })
            setChecked(newArray)
        }
    }
    
    // deletes selected prints from database 
    const deletePrints = async () => {
        try {
            const res = await axios.post("/delete/prints", checked)
            setAlert(res.data.msg, "var(--medium)")
            
        } catch (err) {
            setAlert(err.response.msg, "var(--medium)")
        }
        var checkboxes = document.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach(box => {
                if (box.checked) {box.checked = false}
            })
        setChecked([])
        refreshArt();
    }
    
    return (
        <div className="update-stock">
            <h2>Update Art for Sale</h2>
            <h4>Originals</h4>
            <div className="print-stock">
                {prints ? prints.map((art, i) => {
                    if(art.original) {
                    return (
                    <div className="print-stock-item" key={i}>
                        <h5>{art.title}</h5>
                        <img 
                            src={art.img}
                            alt={art.name} 
                        />
                        <ul>
                            {/* <li>
                                <label htmlFor="fiveEight" className="quantity">5 x 8:</label>
                                <input 
                                    id="fiveEight" 
                                    type="number" 
                                    inputMode="numeric"
                                    onChange={update} 
                                    name={art.title} 
                                    className="quantity" 
                                    value={stock.length && stock[i].stock.fiveEight}
                                    min="0"
                                />
                            </li>
                            <li>
                                <label htmlFor="eightEleven" className="quantity">8.5 x 11:</label>
                                <input 
                                    id="eightEleven" 
                                    type="number"  
                                    inputMode="numeric"
                                    onChange={update} 
                                    name={art.title} 
                                    className="quantity" 
                                    value={stock.length && stock[i].stock.eightEleven}
                                    min="0"
                                />
                            </li>
                            <li>
                                <label htmlFor="oneeightTwofour" className="quantity">18 x 24:</label>
                                <input 
                                    id="oneeightTwofour"
                                    type="number"  
                                    inputMode="numeric"
                                    onChange={update} 
                                    name={art.title}  
                                    className="quantity"  
                                    value={stock.length && stock[i].stock.oneeightTwofour}
                                    min="0"
                                />
                            </li>
                            <hr/> */}
                            <li>
                                <label htmlFor="delete-box">Delete?</label>
                                <input 
                                    value={art.title} 
                                    name={art.type}
                                    type='checkbox' 
                                    id="delete-box" 
                                    onChange={stageDelete}/>
                            </li>
                        </ul>
                    </div>
                    )} else {
                        return null
                    }
                }) :
                <div className="progress">
                    <CircularProgress color="inherit" />
                </div>
            }  
            </div>
            <h4>Prints</h4>
            <div className="print-stock">
                {prints && prints.map((art, i) => {
                    if(!art.original) {
                        return (
                        <div className="print-stock-item" key={i}>
                            <h5>{art.title}</h5>
                            <img 
                                src={art.img}
                                alt={art.name} 
                            />
                            <ul>
                                <li>
                                    <label htmlFor="delete-box">Delete?</label>
                                    <input 
                                        value={art.title} 
                                        name={art.type}
                                        type='checkbox' 
                                        id="delete-box" 
                                        onChange={stageDelete}/>
                                </li>
                            </ul>
                        </div>
                        )
                    } else {
                        return null
                    }
                })
                }
            </div>
            
        <div className="print-stock--buttons">
            {/* <button data-text="Submit Changes" onClick={sendChanges}>Submit Changes</button> */}
            <button data-text="Delete Items" onClick={deletePrints}>Delete Items</button>
        </div>
    </div>
    )       
}

export default UpdateStock
