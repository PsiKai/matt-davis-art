import React, { Fragment, useContext, useState, useEffect} from 'react'
import AppContext from "../context/AppContext"
import CircularProgress from "@material-ui/core/CircularProgress"

const UpdateStock = () => {
    const appContext = useContext(AppContext)
    const {prints, updateStock} = appContext;

    const [stock, setStock] = useState([])

    useEffect(() => {
        prints && prints.forEach(print => {
            setStock(stock => [
                ...stock,
                {title: print.title,
                stock: print.stock}
            ]) 
        })
    }, [prints])

    //changes state of stock on input change
    const update = (e) => {
        var newStock = [...stock]
        var title = e.target.name
        var stockItem = e.target.id
        var newValue = e.target.value
        
        newStock.filter(item => {
            if (item.title === title) {
                return item.stock = {
                    ...item.stock,
                    [stockItem]: newValue
                }
            } return item
        })
        setStock(newStock)  
    }

    //sends stock changes to database
    const sendChanges = () => {
        updateStock(stock)
    }        
    
    return (
        <Fragment>
            <h2>Update Print Stock</h2>
            
            <div className="print-stock">
                {prints ? prints.map((art, i) => {
                    var bytes = Buffer.from(art.img.data)
                    return (
                    <div className="print-stock-item" key={i}>
                        <img 
                            src={`data:${art.img.contentType};base64, ${bytes.toString('base64')}`} 
                            alt={art.name} 
                        />

                        <label htmlFor="fiveEight" className="quantity">5 x 8</label>
                        <input 
                            id="fiveEight" 
                            type="number" 
                            onChange={update} 
                            name={art.title} 
                            className="quantity" 
                            value={stock.length && stock[i].stock.fiveEight}
                            min="0"
                        />

                        <label htmlFor="eightEleven" className="quantity">8.5 x 11</label>
                        <input 
                            id="eightEleven" 
                            type="number" 
                            onChange={update} 
                            name={art.title} 
                            className="quantity" 
                            value={stock.length && stock[i].stock.eightEleven}
                            min="0"
                        />

                        <label htmlFor="oneeightTwofour" className="quantity">18 x 24</label>
                        <input 
                            id="oneeightTwofour"
                            type="number" 
                            onChange={update} 
                            name={art.title}  
                            className="quantity"  
                            value={stock.length && stock[i].stock.oneeightTwofour}
                            min="0"
                        />
                    </div>
                    )
                }) :
                <div className="progress">
                    <CircularProgress color="inherit" />
                </div>
            }  
            </div>
        <button onClick={sendChanges}>Submit Changes</button>
        </Fragment>
    )     
    
}

export default UpdateStock
