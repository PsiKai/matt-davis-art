import React, {useReducer} from 'react';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import { ADD_TO_CART } from './types'

const AppState = (props) => {

    const initialState = {
        cartItems: 0,
        cart: [],
        total: 0
    }

    const [state, dispatch] = useReducer(AppReducer, initialState);

    //adds item to cart
    const addItem = (item) => {

        dispatch({
            type: ADD_TO_CART,
            payload: item
        })
    }

    return (
        <AppContext.Provider
            value={{
                addItem,
                cartItems: state.cartItems,
                cart: state.cart,
                total: state.total
            }}>
                {props.children}
        </AppContext.Provider>
    )
}

export default AppState;