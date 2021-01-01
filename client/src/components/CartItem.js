import React from 'react'

const CartItem = (props) => {
    const {quantity, name, img, price} = props
    return (
        <div className="cart-item">
            <h2>{name}</h2>
            <img src={img} alt={name} />
            <p>${(price * quantity).toFixed(2)}</p>
            <p>Quantity: {quantity}</p>
        </div>
    )
}

export default CartItem
