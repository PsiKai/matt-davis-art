import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { ADD_TO_CART, GET_ART, RELOAD_CART } from './types'
import axios from "axios";

const AppState = (props) => {

    const initialState = {
        gallery: [],
        prints: [],
        cartItems: 0,
        cart: [],
        total: 0
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    //adds item to cart
    const addItem = async (item) => {
        const res = await axios.post("/cart/add", {item: item.id})
        res.data.quantity = item.quantity
        var currCart = JSON.parse(localStorage.getItem("cart")) || [];
        currCart.push(res.data);
        
        localStorage.setItem("cart", JSON.stringify(currCart))
        console.log(currCart);
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })
    }

    //reloads cart items
    const reloadCart = () => {
        console.log(localStorage.getItem("cart"));
        dispatch({
            type: RELOAD_CART,
            payload: JSON.parse(localStorage.getItem("cart"))
        })
    }

    //gets prints from backend server
    const getArt = async () => {
        const res = await axios.get("/art")
        dispatch({
            type: GET_ART,
            payload: res.data.art
        })
    }

    //add items to 

    return (
        <AppContext.Provider
            value={{
                addItem,
                reloadCart,
                getArt,
                cartItems: state.cartItems,
                cart: state.cart,
                total: state.total,
                prints: state.prints,
                gallery: state.gallery
            }}>
                {props.children}
        </AppContext.Provider>
    )
}

export default AppState;