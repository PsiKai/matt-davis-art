import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { ADD_TO_CART, GET_ART, RELOAD_CART, CHECKOUT, UPDATE_STOCK } from './types'
import axios from "axios";

const AppState = (props) => {

    const initialState = {
        gallery: [],
        prints: [],
        cartItems: 0,
        cart: [],
        total: 0,
        stock: []
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    //adds item to cart
    const addItem = async (item) => {
        const res = await axios.post("/cart/add", {item: item.id})
        res.data.quantity = item.quantity
        var currCart = JSON.parse(localStorage.getItem("cart")) || [];
        currCart.push(res.data);
        localStorage.setItem("cart", JSON.stringify(currCart))
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        })
    }

    //reloads cart items
    const reloadCart = () => {
        var storedCart = JSON.parse(localStorage.getItem("cart"))
        if (storedCart) {
            var reducedCart = storedCart.reduce((accumulator, cur) => {
            var name = cur.name;
            var found = accumulator.find((elem) => {
                return elem.name === name
            })
            if (found) found.quantity += cur.quantity;
            else accumulator.push(cur);
            return accumulator;
        }, []);
            reducedCart.forEach(item => item.price = parseFloat(item.price))
        dispatch({
            type: RELOAD_CART,
            payload: reducedCart
        }) 
        }
        
    }

    //gets gallery arts and prints from backend server
    const getArt = async () => {
        const res = await axios.get("/art")
        // console.log(res.data);
        dispatch({
            type: GET_ART,
            payload: res.data.arts
        })
    }

    //checkout items 
    const checkout = () => {
        dispatch({
            type: CHECKOUT
        })
    }

    //upload image to gallery
    const uploadToGallery = async (form) => {
        console.log(form);
        try {
            const res= await axios.post('/upload/gallery', form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            window.alert(res.data);
        } catch (err) {
            if(err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                window.alert(err.response.data.msg);
            }
        }

        
    }

    //update stock amounts
    const updateStock = (item) => {
        console.log(item, state.stock)
        dispatch({
            type: UPDATE_STOCK,
            payload: item
        })
    }

    return (
        <AppContext.Provider
            value={{
                addItem,
                reloadCart,
                getArt,
                checkout,
                updateStock,
                uploadToGallery,
                stock: state.stock,
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