import React, {Fragment, useContext, useEffect} from 'react'
import CartItem from './CartItem'
import AppContext from "../context/AppContext";

const CartItems = () => {
    const appContext = useContext(AppContext);
    const {cartItems, cart, total, checkout, reloadCart} = appContext;

    const clear = () => {
        checkout();
    }

    useEffect(() => {
        reloadCart();
        //eslint-disable-next-line
    }, [])

    return (
            <Fragment>
                <div className="cart-flexbox">
                {cart.map((item, i) => (
                    <CartItem 
                        key={i}
                        img={item.src}
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
                    <button onClick={clear}>Buy my shite!</button>
                </div>
            </Fragment> 
    )
}

export default CartItems
