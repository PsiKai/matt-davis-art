//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "UPDATE_CART":
      var items = 0
      var price = 0
      action.payload.forEach(item => {
        items = +items + +item.quantity
        price = +price + +item.price * +item.quantity
      })
      return {
        ...state,
        cart: action.payload,
        cartItems: items,
        total: price,
      }
    case "DELETE_CART":
      return {
        ...state,
        cartItems: 0,
        total: 0,
        cart: null,
      }
    case "GET_ART":
      return {
        ...state,
        prints: action.payload.prints,
        gallery: action.payload.gallery,
      }
    case "CHECKOUT":
      return {
        ...state,
        total: action.payload + 0,
      }
    case "PURCHASED":
      localStorage.removeItem("cart")
      return {
        ...state,
        cart: null,
        cartItems: 0,
        total: 0,
        purchased: true,
        modal: action.payload,
      }
    case "CLEAR_PURCHASE":
      return {
        ...state,
        purchased: false,
        modal: "",
      }
    default:
      return state
  }
}
