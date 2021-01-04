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
            var newCart = state.cart ? [...state.cart, (action.payload)] : [(action.payload)]
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
                cartItems: state.cartItems + parseFloat(action.payload.quantity),
                cart: reducedCart,
                total: state.total + parseFloat(action.payload.price)
            }
        case RELOAD_CART:
            var quantity = 0;
            var total = 0;
            action.payload.forEach(item => {
                quantity += item.quantity
                total += item.price
            })
            return {
                cart: action.payload,
                cartItems: quantity,
                total: total
            }
        case GET_ART:
            var currStock = []
            const printStock = action.payload.prints.forEach((print, i) => {
                currStock = [...currStock, {index: i, stock: parseFloat(print.stock)}]
            })
            console.log(printStock); 
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
                cart: [],
                cartItems: 0
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