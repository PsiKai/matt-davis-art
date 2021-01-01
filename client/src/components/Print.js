import React, {useContext} from 'react'
import AppContext from "../context/AppContext";

const Print = (props) => {
    const appContext = useContext(AppContext);
    const {addItem} = appContext;

    const addToCart = (e) => {
        const info = e.target.parentNode.children
        const item = {
            img: info[1].src,
            name: info[0].innerText,
            price: parseFloat(info[3].innerText.slice(1)),
            quantity: 1
        }
        addItem(item);
    }

    return (
        <div className="print-item">
            <h3>{props.name}</h3>
            <img src={props.src} alt={props.name}></img>
            <p>{props.description}</p>
            <p>${props.price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Print
