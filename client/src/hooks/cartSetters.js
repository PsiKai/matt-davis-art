import { useContext } from "react"
import AppContext from "../context/AppContext"

import axios from "axios"

import { useArtRefresh } from "./artApi"

export function useCart() {
  const { dispatch, prints } = useContext(AppContext)
  const refreshArt = useArtRefresh()

  function addItem({ id, quantity }) {
    var newCartItem = prints.find(print => print._id === id)
    newCartItem.quantity = quantity

    let cart = JSON.parse(localStorage.getItem("cart")) || []
    var foundIndex = cart.findIndex(item => item._id === id)

    foundIndex >= 0 ? (cart[foundIndex].quantity += +quantity) : cart.push(newCartItem)

    localStorage.setItem("cart", JSON.stringify(cart))

    dispatch({ type: "UPDATE_CART", payload: cart })
  }

  function editItem({ id, quantity }) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    var foundIndex = cart.findIndex(item => item._id === id)

    cart[foundIndex].quantity = quantity

    localStorage.setItem("cart", JSON.stringify(cart))

    dispatch({ type: "UPDATE_CART", payload: cart })
  }

  const removeItem = id => {
    var cart = JSON.parse(localStorage.getItem("cart"))
    var newCart = cart.filter(item => item._id !== id)
    if (newCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(newCart))
      dispatch({ type: "UPDATE_CART", payload: newCart })
    } else {
      localStorage.removeItem("cart")
      dispatch({ type: "DELETE_CART" })
    }
  }

  async function reloadCart() {
    var storedCart = JSON.parse(localStorage.getItem("cart"))
    if (storedCart) {
      const {
        data: { availableArt },
      } = await axios.post("/api/artwork/availability", storedCart)

      if (availableArt.length !== storedCart.length) refreshArt()

      localStorage.setItem("cart", JSON.stringify(availableArt))
      dispatch({ type: "UPDATE_CART", payload: availableArt })
    } else {
      dispatch({ type: "DELETE_CART" })
    }
  }

  return { addItem, reloadCart, removeItem, editItem }
}
