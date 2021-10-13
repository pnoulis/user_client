import {tabs} from "lib/utils";
const
ACTIONS = {
  addCart: ({pid, amount}) => ({scope: "public", type: "ADD", pid, amount}),
  removeCart: (product, token) => ({scope: "public", type: "REMOVE", product, token}),
  deleteCart: (pid, token) => ({scope: "public", type: "DELETE", pid, token}),
  calculateCart: () => ({scope: "public", type: "CALCULATE"}),
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "ADD":
    const newCart = {
      ...state.cart,
      meta: {...state.cart.meta, total: Number(state.cart.meta.total) + action.amount},
      [action.pid]: state.cart[action.pid] ? state.cart[action.pid] + action.amount : action.amount
    };
    return newCart;
  case "REMOVE":
  case "DELETE":
  case "CALCULATE":
  default:
    return state.cart;
  }
},
CART_STORE = {
  ACTIONS,
  REDUCER,
};

export {CART_STORE};
