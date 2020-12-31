import React from 'react'

const Print = (props) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <img src={props.src} alt={props.name}></img>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    )
}

export default Print
