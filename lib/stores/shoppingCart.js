import {tabs} from "lib/utils";
const
ACTIONS = {
  addCart: ({pid, amount}) => ({type: "ADD", pid, amount}),
  removeCart: (product, token) => ({type: "REMOVE", product, token}),
  deleteCart: (pid, token) => ({type: "DELETE", pid, token}),
  calculateCart: () => ({type: "CALCULATE"}),
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "ADD":
    const newCart = {
      ...state.cart,
      meta: {...state.cart.meta, total: Number(state.cart.meta.total) + action.amount},
      [action.pid]: state.cart[action.pid] ? state.cart[action.pid] + action.amount : action.amount
    };
    tabs.notify("state", {...state, cart: newCart});
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
