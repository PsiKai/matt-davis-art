import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { ADD_TO_CART, GET_ART, RELOAD_CART, CHECKOUT, UPDATE_STOCK } from './types'
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

        newCartItem[0].stock = item.quantity;

        if (localStorage.getItem("cart") !== null) {
            console.log(JSON.parse(localStorage.getItem("cart")));
            var newCart = [...JSON.parse(localStorage.getItem("cart")), ...newCartItem]
        } else {
            var newCart = [...newCartItem]
        } 
        console.log(newCart);
        var reducedCart = newCart.reduce((accumulator, cur) => {
            var name = cur._id;
            var found = accumulator.find((elem) => {
                // console.log(name, elem._id);
                return elem._id === name
                
            })
            
            if (found) {
                var values = Object.entries(found.stock)
                values.forEach(value => {
                    if (value[0] === "fiveEight") {
                        found.stock.fiveEight = +cur.stock.fiveEight + +value[1]
                    }
                    if (value[0] === "eightEleven") {
                        found.stock.eightEleven = +cur.stock.eightEleven + +value[1]
                    }
                    if (value[0] === "oneeightTwofour") {
                        found.stock.oneeightTwofour = +cur.stock.oneeightTwofour + +value[1]
                    }
                })
            }
            else accumulator.push(cur);
            return accumulator;
        }, []);

        console.log(reducedCart);
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
        //     var reducedCart = storedCart.reduce((accumulator, cur) => {
        //     var name = cur.name;
        //     var found = accumulator.find((elem) => {
        //         return elem.name === name
        //     })
        //     if (found) found.quantity += cur.quantity;
        //     else accumulator.push(cur);
        //     return accumulator;
        // }, []);
        //     reducedCart.forEach(item => item.price = parseFloat(item.price))
        dispatch({
            type: RELOAD_CART,
            payload: storedCart
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

    //upload image to prints
    const uploadPrint = async (form) => {
        // console.log(form.quantity);
        try {
            const res = await axios.post("/upload/prints", form, {
                header: {
                    "Content-Type": "multipart/form-data"
                }
            })

            window.alert(res.data)
        } catch (err) {
            if(err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                window.alert(err.response.data.msg)
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