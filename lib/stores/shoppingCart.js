const
ACTIONS = {
  addCart: (product, token) => ({type: "ADD", product, token}),
  removeCart: (product, token) => ({type: "REMOVE", product, token}),
  deleteCart: (pid, token) => ({type: "DELETE", pid, token}),
  calculateCart: () => ({type: "CALCULATE"}),
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "ADD":
    return {token: action.token, __cart: [...state.__cart, action.product]};
  case "REMOVE":
  case "DELETE":
  case "CALCULATE":
  default:
    return state;
  }
},
CART_STORE = {
  ACTIONS,
  REDUCER,
};

export {CART_STORE};
