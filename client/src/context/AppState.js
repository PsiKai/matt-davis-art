import React, { useReducer } from "react"
import AppContext from "./AppContext"
import AppReducer from "./AppReducer"
import { ADD_TO_CART, GET_ART, RELOAD_CART, DELETE_CART } from "./types"
import axios from "axios"

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

  //adds item to cart
  const addItem = async ({ id, quantity }) => {
    var newCartItem = state.prints.find(print => print._id === id)
    newCartItem.quantity = quantity

    let cart = JSON.parse(localStorage.getItem("cart")) || []
    var foundIndex = cart.findIndex(item => item._id === id)

    foundIndex >= 0 ? (cart[foundIndex].quantity += +quantity) : cart.push(newCartItem)

    localStorage.setItem("cart", JSON.stringify(cart))

    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    })
    reloadCart()
  }

  //reloads cart items
  const reloadCart = async () => {
    var storedCart = JSON.parse(localStorage.getItem("cart"))
    if (storedCart) {
      const {
        data: { availableArt },
      } = await axios.post("/art/availability", storedCart)
      if (availableArt.length !== storedCart.length) refreshArt()
      localStorage.setItem("cart", JSON.stringify(availableArt))
      dispatch({
        type: RELOAD_CART,
        payload: availableArt,
      })
    } else {
      dispatch({
        type: DELETE_CART,
      })
    }
  }

  //refreshes art works after changing content
  const refreshArt = async () => {
    const res = await axios.get("/art/refresh")
    dispatch({
      type: GET_ART,
      payload: res.data,
    })
  }

  return (
    <AppContext.Provider
      value={{
        addItem,
        reloadCart,
        refreshArt,
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
