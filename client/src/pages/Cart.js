import React, {useContext} from 'react';
import AppContext from "../context/AppContext";

import CartItem from "../components/CartItem";

const Cart = () => {
    const appContext = useContext(AppContext);
    const {cartItems, cart, total} = appContext;

    // var reducedCart = cart.reduce((accumulator, cur) => {
    //     var name = cur.name;
    //     var found = accumulator.find((elem) => {
    //         return elem.name == name
    //     })
    //     if (found) found.quantity += cur.quantity;
    //     else accumulator.push(cur);
    //     return accumulator;
    // }, []);

    console.log(cart);

    return (
        <div className="page-content">
            <h1 className="page-header">Cart</h1>
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
                <button>Buy my shite!</button>
            </div>
            
        </div>
    )
}

export default Cart
