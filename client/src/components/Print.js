import React, {useContext} from 'react'
import AppContext from "../context/AppContext";

const Print = (props) => {
    const appContext = useContext(AppContext);
    const {addItem} = appContext;

    const addToCart = (e) => {
        
        const info = e.target.parentNode.children
        const item = {
            quantity: 1,
            id: info[1].name
        }
        addItem(item);
    }

    return (
        <div className="print-item">
            <h3>{props.name}</h3>
            <img src={props.src} alt={props.name} name={props.sku}></img>
            <p>{props.description}</p>
            <p>${props.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Print
