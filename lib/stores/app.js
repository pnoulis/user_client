import React, {useReducer, useContext, useEffect} from "react";
import {FLASH_MESSAGE_STORE} from "./flashMessages";
import {USER_STORE} from "./user";
import {CART_STORE} from "./shoppingCart";
import {tabs} from "lib/utils";
import backend from "lib/backend";
import {Hash} from "lib/utils";
import {createPersistedState} from "lib/hooks";


const
ACTIONS = {
  ...FLASH_MESSAGE_STORE.ACTIONS,
  ...CART_STORE.ACTIONS,
  logout: () => {return {type: "LOGOUT"};},
  setSession: (session) => {return {type: "SET_SESSION", session};},
  tabChange: (tabState) => {return {type: "TAB_CHANGE", tabState};},
  forceRedraw: () => {return {type: "FORCE_REDRAW"};},
},
REDUCER = (state, action) => {

  switch (action.type) {
  case "LOGOUT":
    tabs.notify("state", APP_SCHEMA);
    return state;
  case "SET_SESSION":
    tabs.notify("state", {...state, ...action.session});
    return {
      ...state,
      ...action.session,
    };
  case "FORCE_REDRAW":
    return {...state, key: state.key + 1};
  case "TAB_CHANGE":
    return action.tabState;
  default:
    return {
      ...state,
      flashMessages: FLASH_MESSAGE_STORE.REDUCER(state.flashMessages, action),
      cart: CART_STORE.REDUCER(state, action)
    };
  }
},
APP_SCHEMA = {
  key: 0,
  flashMessages: [],
  cart: {meta: {total: 0},},
  loggedIn: false,
},
useApp = () => {
  const
  [state, dispatch] = useReducer(REDUCER, APP_SCHEMA),
  proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload));

  useEffect(() => {
    backend.get({url: "/session"})
      .then(res => {
        res.ok && proxy("setSession", res.payload);
      }).catch(err => console.log(err));

    tabs.listenForChanges("state", proxy);
  }, []);

  if (state.loggedIn && Date.now() > state.expires) {
    window.location.reload();
  }
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
