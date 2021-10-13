import React, {useReducer} from "react";
import {FLASH_MESSAGE_STORE} from "./flashMessages";
import {CART_STORE} from "./shoppingCart";
import {createPersistedReducer} from "lib/hooks";

const persistentApp = createPersistedReducer("app");
const
APP_SCHEMA = {
  key: 0,
  fms: [],
  cart: {meta: {total: 0}},
  loggedIn: false,
},
ACTIONS = {
  ...FLASH_MESSAGE_STORE.ACTIONS,
  ...CART_STORE.ACTIONS,
  login: session => ({type: "LOGIN", session}),
  logout: () => ({type: "LOGOUT"}),
  forceRedraw: () => ({type: "FORCE_REDRAW"}),
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "LOGOUT":
    return APP_SCHEMA;
  case "LOGIN":
    return {...state, ...action.session};
  case "FORCE_REDRAW":
    return {...state, key: state.key + 1};
  case "STORAGE_EVENT":
    return action.storage;
  default:
    return {
      ...state,
      fms: FLASH_MESSAGE_STORE.REDUCER(state.fms, action),
      cart: CART_STORE.REDUCER(state, action)
    };
  }
},
AppContext = React.createContext({
  app: {},
  setApp: () => {},
}),
useAppContext = () => React.useContext(AppContext),
useApp =  () => {
  const [state, dispatch] = persistentApp(REDUCER, APP_SCHEMA);
  const proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload));

  return {app: state, setApp: proxy};
},
APP_STORE = {
  AppContext,
  useAppContext,
  useApp,
};
export {APP_STORE};
