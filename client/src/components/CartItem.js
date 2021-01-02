import React, { Fragment } from 'react'

const CartItem = (props) => {
    const {quantity, name, img, price} = props
    return (
        <Fragment>
           <div className="cart-item">
                <img src={img} alt={name} />
                <div>
                    <h2>{name}</h2>
                    <p>${(price * quantity).toFixed(2)}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div> 
            
        </Fragment>
        
    )
}

export default CartItem
