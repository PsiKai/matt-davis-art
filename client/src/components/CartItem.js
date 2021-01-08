import React, { Fragment } from 'react'

const CartItem = (props) => {
    const {quantity, title} = props
    
    const {fiveEight, eightEleven, oneeightTwofour} = quantity;

    var bytes = Buffer.from(props.src.data)
    return (
        <Fragment>
           <div className="cart-item">
                <img src={`data:${props.src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={title} />
                <div>
                    <h2>{title}</h2>
                    {/* <p>${(price * quantity).toFixed(2)}</p> */}
                    <p>Quantity: </p>
                    {fiveEight > 0 && <p>5 x 8: {fiveEight}</p>}
                    {eightEleven > 0 && <p>8.5 x 11: {eightEleven}</p>}
                    {oneeightTwofour > 0 && <p>18 x 24: {oneeightTwofour}</p>}
                </div>
            </div> 
            
        </Fragment>
        
    )
}

export default CartItem
