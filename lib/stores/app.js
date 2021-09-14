import React, {useReducer, useContext, useEffect} from "react";
import {FLASH_MESSAGE_STORE} from "./flashMessages";
import {USER_STORE} from "./user";
import {CART_STORE} from "./shoppingCart";
import {persistentState} from "lib/utils";

const
ACTIONS = {
  ...FLASH_MESSAGE_STORE.ACTIONS,
  ...USER_STORE.ACTIONS,
  ...CART_STORE.ACTIONS,
  getSession: (session) => {return {type: "GET_SESSION", session};},
  forceRedraw: () => {return {type: "FORCE_REDRAW"};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "GET_SESSION":
    return {...state, user: action.session, initialized: true};
  case "FORCE_REDRAW":
    return {...state, key: state.key + 1};
  default:
    return {
      ...state,
      flashMessages: FLASH_MESSAGE_STORE.REDUCER(state.flashMessages, action),
      user: USER_STORE.REDUCER(state.user, action),
      shoppingCart: CART_STORE.REDUCER(state.shoppingCart, action)
    };
  }
},
APP_SCHEMA = {
  // begins with:
  key: 0,
  flashMessages: [],
  cart: {meta: {},},
  user: {
    loggedIn: false,
    // things that are added in the process are:
    //shoppingCart: {},
    //address: {},
    //token: {},
  },
},
useApp = () => {
  const
  [state, dispatch] = useReducer(REDUCER, persistentState.get("state") || APP_SCHEMA),
  proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload));
  useEffect(() => {
    persistentState.set("state", state);
  }, [state]);
  return {app: state, setApp: proxy};
},
appContext = React.createContext({
  app: {},
  setApp: () => {},
}),
useAppContext = () => useContext(appContext),
APP_STORE = {
  appContext,
  useAppContext,
  useApp,
};
export {APP_STORE};
