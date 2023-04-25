import React, { useReducer } from "react"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"

const AppState = props => {
  const initialState = {
    gallery: null,
    prints: null,
    cartItems: 0,
    cart: null,
    total: 0,
    stock: null,
    purchased: false,
    modal: "",
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <AppContext.Provider
      value={{
        stock: state.stock,
        cartItems: state.cartItems,
        cart: state.cart,
        total: state.total,
        prints: state.prints,
        gallery: state.gallery,
        purchased: state.purchased,
        modal: state.modal,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
