import React, {useState, useReducer, useEffect} from "react";
import {FLASH_MESSAGE_STORE} from "./flashMessages";
import {CART_STORE} from "./shoppingCart";
import {createPersistedReducer} from "lib/hooks";

const usePublicState = createPersistedReducer("app");
const usePrivateState = (reducer, state) => useReducer(reducer, state);
const
PUBLIC_SCHEMA = {
  cart: {meta: {amount: 0}},
  loggedIn: false,
  expires: 0,
},
PRIVATE_SCHEMA = {
  key: 0,
  fms: [],
  resources: {},
},
ACTIONS = {
  ...FLASH_MESSAGE_STORE.ACTIONS,
  ...CART_STORE.ACTIONS,
  login: session => ({scope: "public", type: "LOGIN", session}),
  logout: () => ({scope: "both", type: "LOGOUT"}),
  forceRedraw: () => ({scope: "private", type: "FORCE_REDRAW"}),
  setResources: resources  => ({scope: "private", type: "SET_RESOURCES", resources}),
},
PUBLIC_REDUCER = (state, action) => {
  switch (action.type) {
  case "STORAGE_EVENT":
    return action.storage;
  case "LOGIN":
    return {...state, ...action.session};
  // case "LOGOUT":
  //   return {...PUBLIC_SCHEMA, ...PRIVATE_SCHEMA};
  default:
    return {
      ...state,
      cart: CART_STORE.REDUCER(state, action),
    };
  };
},
PRIVATE_REDUCER = (state, action) => {
  switch (action.type) {
  case "FORCE_REDRAW":
    return {...state, key: state.key + 1};
  case "LOGOUT":
    return {...PRIVATE_SCHEMA, ...PUBLIC_SCHEMA, resources: state.resources, fms: state.fms};
  case "SET_RESOURCES":
    return {...state, resources: {...state.resources, ...action.resources}};
  default:
    return {
      ...state,
      fms: FLASH_MESSAGE_STORE.REDUCER(state.fms, action),
    };
  };
},
AppContext = React.createContext({
  app: {},
  setApp: () => {},
}),
useAppContext = () => React.useContext(AppContext),
useApp =  () => {
  const [mounted, setMounted] = useState(false);
  const [publicState, publicDispatch] = usePublicState(PUBLIC_REDUCER, PUBLIC_SCHEMA);
  const [privateState, privateDispatch] = usePrivateState(PRIVATE_REDUCER, PRIVATE_SCHEMA);

  const proxy = (action, ...payload) => {
    action = ACTIONS[action](...payload);
    switch (action.scope) {
    case "public":
      return publicDispatch(action);
    case "private":
      return privateDispatch(action);
    case "both":
      privateDispatch(action);
      return setTimeout(() => publicDispatch(action), 300);
    default:
      console.log("action missing action.stateType property");
    }
  };
  // two-pass rendering
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  return mounted
    ? {app: {...publicState, ...privateState}, setApp: proxy}
  : {app: {...PUBLIC_SCHEMA, ...privateState}, setApp: proxy};
},
APP_STORE = {
  AppContext,
  useAppContext,
  useApp,
};
export {APP_STORE};
