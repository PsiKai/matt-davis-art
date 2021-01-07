import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { ADD_TO_CART, GET_ART, RELOAD_CART, CHECKOUT } from './types'
import axios from "axios";

const AppState = (props) => {

    const initialState = {
        gallery: null,
        prints: null,
        cartItems: 0,
        cart: null,
        total: 0,
        stock: null
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    //adds item to cart
    const addItem = async (item) => {
        var newCartItem = state.prints.filter(print => {
            return print._id === item.id
        })

        newCartItem[0].quantity = item.quantity;
        let newCart;
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

        localStorage.setItem("cart", JSON.stringify(reducedCart))
        
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
            getArt();
        } catch (err) {
            if(err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                window.alert(err.response.data.msg);
            }
        }
    }

    //upload image to prints
    const uploadPrint = async (form) => {
        try {
            const res = await axios.post("/upload/prints", form, {
                header: {
                    "Content-Type": "multipart/form-data"
                }
            })
            window.alert(res.data)
            getArt();
        } catch (err) {
            if(err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                window.alert(err.response.data.msg)
            }
        }
    }

    //update stock amounts
    const updateStock = async (item) => {
        const res = await axios.post("/update/stock", item);
        window.alert(res.data);
        getArt();
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
                uploadPrint,
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