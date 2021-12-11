import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { 
    ADD_TO_CART, 
    GET_ART, 
    RELOAD_CART, 
    CHECKOUT, 
    PURCHASED, 
    DELETE_CART,
    CLEAR_PURCHASE 
} from './types'
import axios from "axios";

const AppState = (props) => {

    const initialState = {
        gallery: null,
        prints: null,
        cartItems: 0,
        cart: null,
        total: 0,
        stock: null,
        purchased: false,
        modal: ""
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);


    //adds item to cart
    const addItem = async (item) => {
        let newCart
        var newCartItem = state.prints.filter(print => {
           return print._id === item.id
        })

        newCartItem[0].quantity = item.quantity;       
        
        if (localStorage.getItem("cart") !== null) {
            newCart = [...JSON.parse(localStorage.getItem("cart")), ...newCartItem]
        } else {
            newCart = [...newCartItem]
        } 

        var reducedCart = newCart.reduce((accumulator, cur) => {
            var name = cur._id;
            var found = accumulator.find((elem) => {
                return elem._id === name
            })
            if (found) {
                found.quantity = +found.quantity + +cur.quantity
            }
            else accumulator.push(cur);
            return accumulator;
        }, []);

        localStorage.setItem("cart", JSON.stringify(reducedCart))
        
        dispatch({
            type: ADD_TO_CART,
            payload: reducedCart
        })
        reloadCart();
    }


    //reloads cart items
    const reloadCart = async () => {
        var storedCart = JSON.parse(localStorage.getItem("cart"))
        if (storedCart) {
            const res = await axios.post("/art/availability", storedCart)
            console.log(res.data.availableArt, storedCart);
            localStorage.setItem("cart", JSON.stringify(res.data.availableArt))
            dispatch({
                type: RELOAD_CART,
                payload: res.data.availableArt
            }) 
        } else {
            dispatch({
                type: DELETE_CART
            })
        }
    }


    //gets gallery arts and prints from backend server
    const getArt = async () => {
        const res = await axios.get("/art")
        dispatch({
            type: GET_ART,
            payload: res.data
        })
    }

    //refreshes art works after changing content
    const refreshArt = async () => {
        const res = await axios.get("/art/refresh")
        dispatch({
            type: GET_ART,
            payload: res.data
        })
    }

    //checkout items 
    const checkout = async (items) => {
        const res = await axios.post("/cart/checkout", items)
        
        dispatch({
            type: CHECKOUT,
            payload: res.data
        })
    }

    //completes the purchase
    const completePurchase = async (order) => {
        const res = await axios.post("/cart/purchase", order)
        dispatch({
            type: PURCHASED,
            payload: res.data
        })
    }

    //clears purchase modal
    const clearPurchase = () => dispatch({type: CLEAR_PURCHASE})

    return (
        <AppContext.Provider
            value={{
                addItem,
                reloadCart,
                getArt,
                refreshArt,
                checkout,
                completePurchase,
                clearPurchase,
                stock: state.stock,
                cartItems: state.cartItems,
                cart: state.cart,
                total: state.total,
                prints: state.prints,
                gallery: state.gallery,
                purchased: state.purchased,
                modal: state.modal
            }}>
                {props.children}
        </AppContext.Provider>
    )
}

export default AppState;