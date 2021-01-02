import {
    ADD_TO_CART,
    GET_ART,
    RELOAD_CART
} from "./types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            var newCart = [...state.cart, (action.payload)]
            var reducedCart = newCart.reduce((accumulator, cur) => {
                var name = cur.name;
                var found = accumulator.find((elem) => {
                    return elem.name === name
                })
                if (found) found.quantity += cur.quantity;
                else accumulator.push(cur);
                return accumulator;
            }, []);
            return {
                ...state,
                cartItems: state.cartItems + 1,
                cart: reducedCart,
                total: state.total + parseFloat(action.payload.price)
            }
        case RELOAD_CART:
            return {
                cart: action.payload
            }
        case GET_ART: 
            return {
                ...state,
                prints: action.payload.prints,
                gallery: action.payload.gallery
            }
        default: 
            return state;
    }
};