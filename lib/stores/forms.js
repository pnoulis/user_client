import React, {useReducer, useContext} from "react";
import {reduceFields, reduceFieldErrors} from "lib/input";

const
ACTIONS = {
  setErrors: (fieldErrors) => {return {type: "SET_ERRORS", fieldErrors};},
  setInput: (name, value) => {return {type: "SET_INPUT", name, value};},
  toggle: (operation, initialState) => {return {type: "TOGGLE", operation, initialState};},
  edit: (toggle) => {return {type: "EDIT", toggle};},
  refreshForm: (initialState) => {return {type: "REFRESH_FORM", initialState};},
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "SET_ERRORS":
    return {...state, toggled: false, fieldErrors: action.fieldErrors, edit: true};
  case "SET_INPUT":
    return {
      ...state,
      fields: reduceFields(state.fields, action.name, action.value),
      fieldErrors: reduceFieldErrors(state.fieldErrors, action.name, action.value),
    };
  case "TOGGLE":
    if (action.operation === "cancel") return action.initialState;
    if (action.operation === "delete" && state.NEW) return action.initialState;
    return {...state, toggled: action.operation, edit: action.operation === "edit"};
  case "EDIT":
    return {...state, toggled: action.toggle, edit: action.toggle === "edit"};
  case "REFRESH_FORM":
    return action.initialState;
  default:
    return state;
  }
},
SCHEMA = {
  fieldErrors: {},
  fields: {},
  edit: true,
  NEW: false,
  toggled: "",
},
useForm = (initialState) => {
  const
  [state, dispatch] = useReducer(REDUCER, {...SCHEMA, ...initialState}),
  proxy = (action, ...payload) => dispatch(ACTIONS[action](...payload, initialState));
  return {form: state, setForm: proxy};
},
formContext = React.createContext({
  form: {},
  setForm: () => {},
}),
useFormContext = () => useContext(formContext),
FORM_STORE = {
  formContext,
  useFormContext,
  useForm,
};
export {FORM_STORE};
