// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }
    case "REGISTER":
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      }
    case "LOGOUT":
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}
