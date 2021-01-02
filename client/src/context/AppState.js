import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { ADD_TO_CART, GET_ART } from './types'
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
        // var quantity = item.quantity
        res.data.quantity = item.quantity
        console.log(res.data);
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })
    }

    //gets prints from backend server
    const getArt = async () => {
        const res = await axios.get("/art")
        console.log(res.data.art);
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