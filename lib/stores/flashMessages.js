/* USED BY THE APP FILE */
const
ACTIONS = {
  addFlash: fm => ({type: "ADD_FLASH", fm}),
  rmFlash: flashId => ({type: "REMOVE_FLASH", flashId}),
  popFlash: () => ({type: "POP_FLASH"}),
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "ADD_FLASH":
    return [...state, action.fm];
  case "REMOVE_FLASH":
    return state.filter(fm => fm.flashId !== action.flashId);
  case "POP_FLASH":
    return state.splice(0, state.length - 1);
  default:
    return state;
  }
},
FLASH_MESSAGE_STORE = {
  ACTIONS,
  REDUCER,
};
export {FLASH_MESSAGE_STORE};
