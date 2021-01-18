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
                var values = Object.entries(found.quantity)
                values.forEach(value => {
                    if (value[0] === "fiveEight") {
                        found.quantity.fiveEight = +cur.quantity.fiveEight + +value[1]
                    }
                    if (value[0] === "eightEleven") {
                        found.quantity.eightEleven = +cur.quantity.eightEleven + +value[1]
                    }
                    if (value[0] === "oneeightTwofour") {
                        found.quantity.oneeightTwofour = +cur.quantity.oneeightTwofour + +value[1]
                    }
                })
            }
            else accumulator.push(cur);
            return accumulator;
        }, []);
        var newNew = [];
        reducedCart.forEach(item => {
            var obj = {}
            obj.quantity = item.quantity
            obj.stock = item.stock
            obj.title = item.title
            obj._id = item._id
            newNew.push(obj)
        })

        localStorage.setItem("cart", JSON.stringify(newNew))
        
        dispatch({
            type: ADD_TO_CART,
            payload: reducedCart
        })
        reloadCart();
    }


    //reloads cart items
    const reloadCart = () => {
        var storedCart = JSON.parse(localStorage.getItem("cart"))
        if (storedCart) {
            dispatch({
                type: RELOAD_CART,
                payload: storedCart
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

        // if (res.status !== 200) {
        //     dispatch({
        //         type: PURCHASED,
        //         payload: res.data
        //     })
        // }
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