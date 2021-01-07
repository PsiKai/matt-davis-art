import React, {Fragment, useContext} from 'react'
import CartItem from './CartItem'
import AppContext from "../context/AppContext";

const CartItems = () => {
    const appContext = useContext(AppContext);
    const {cartItems, cart, total, checkout} = appContext;


    //submit payment TODO
    const clear = () => {
        checkout();
    }

    return (
            <Fragment>
                <div className="cart-flexbox">
                {cart.map((item, i) => (
                    <CartItem 
                        key={i}
                        src={item.img}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                    />
                    ))
                }
                </div>
                <hr className="cart-division" />
                <div className="cart-total">
                    <p>Items in cart = {cartItems}</p>        
                    <h3>Total: ${total}</h3>  
                    <button onClick={clear}>Checkout</button>
                </div>
            </Fragment> 
    )
}

export default CartItems
