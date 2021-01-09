import {
    ADD_TO_CART,
    GET_ART,
    RELOAD_CART,
    DELETE_CART,
    CHECKOUT,
    PURCHASED
} from "./types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }
        case RELOAD_CART:
            var items = 0
            var price = 0
            action.payload.forEach(item => {
                var values = Object.entries(item.quantity)
                values.forEach(value => {
                    if (value[0] === "fiveEight") {
                        items = items + +value[1]
                        price = price + (3 * +value[1])
                    }
                    if (value[0] === "eightEleven") {
                        items = items + +value[1]
                        price = price + (5 * +value[1])
                    }
                    if (value[0] === "oneeightTwofour") {
                        items = items + +value[1]
                        price = price + (10 * +value[1])
                    }
                })
            })
            return {
                ...state,
                cart: action.payload,
                cartItems: items,
                total: price
            }
        case DELETE_CART:
            return {
                ...state,
                cartItems: 0,
                total: 0,
                cart: null
            }
        case GET_ART:
            return {
                ...state,
                prints: action.payload.prints,
                gallery: action.payload.gallery,
            }
        case CHECKOUT:
            return {
                ...state,
                total: action.payload
            }
        case PURCHASED:
            localStorage.removeItem("cart");
            return {
                ...state,
                cart: null,
                cartItems: 0,
                total: 0
            }
        default: 
            return state;
    }
};