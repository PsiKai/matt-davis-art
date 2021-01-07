import {
    ADD_TO_CART,
    GET_ART,
    RELOAD_CART,
    CHECKOUT,
    UPDATE_STOCK
} from "./types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            
            return {
                ...state,
                // cartItems: state.cartItems + parseFloat(action.payload.quantity),
                cart: action.payload,
                // total: state.total + parseFloat(action.payload.price)
            }
        case RELOAD_CART:
            var items = 0
            var price = 0
            action.payload.forEach(item => {
                var values = Object.entries(item.stock)
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
        case GET_ART:
            var currStock = []
            action.payload.prints.forEach((print, i) => {
                currStock = [...currStock, {index: i, stock: parseFloat(print.stock)}]
            })
            return {
                ...state,
                prints: action.payload.prints,
                gallery: action.payload.gallery,
                stock: currStock
            }
        case CHECKOUT:
            localStorage.removeItem("cart");
            return {
                ...state,
                cart: null,
                cartItems: 0,
                price: 0
            }
        case UPDATE_STOCK: 
            console.log(action.payload, state.stock);
            const stockAm =  [...state.stock].map((item, i) => {
                if(item.index === parseFloat(action.payload.id)) {
                    return item = {
                        index: parseFloat(action.payload.id),
                        stock: action.payload.value
                    }
                } else return item
            })
            return {
                ...state,
                stock: stockAm
            }
            
        default: 
            return state;
    }
};