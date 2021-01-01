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

    // console.log(reducedCart);

    return (
        <div className="page-content">
            <h1 className="page-header">Cart</h1>
            <p>Items in cart = {cartItems}</p>
            {cart.map((item, i) => (
                <CartItem 
                    key={i}
                    img={item.img}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                />
            ))
            }
                    
            <h3>Total: ${total}</h3>  
            <button>Buy my shite!</button>
        </div>
    )
}

export default Cart
