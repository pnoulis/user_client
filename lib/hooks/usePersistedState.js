import {useEffect, useCallback, useState, useRef, useReducer} from "react";
import {useEventListener} from "lib/hooks";
import {Hash} from "lib/utils";
const globalState = {};

const usePersistedReducer = (reducer, initialState, key, {get, set}) => {
  const globalState = useRef();
  const [state, reduce] = useReducer(reducer, initialState, (initialState) => get(key, initialState));

  useEventListener("storage", ({key: k, newValue}) => {
    if (k !== key) return;
    const newState = JSON.parse(newValue);
    state !== newState && reduce({type: "STORAGE_EVENT", storage: newState});
  });

  useEffect(() => {
    globalState.current = createGlobalState(key, reduce, initialState);
    return () => globalState.current.deregister();
  }, [reducer, initialState, key]);

  const persistentState = useCallback((newState) => {
    if (!globalState.current) return;
    const newStateValue = typeof newState === "function" ? newState(state) : newState;
    reduce(newStateValue);
    globalState.current.emit(state);
  }, [state, set, key]);

  useEffect(() => {
    set(key, state);
  }, [state]);

  return [state, persistentState];
};
const usePersistedState = (initialState, key, {get, set}) => {
  const globalState = useRef(null);
  const [state, setState] = useState(() => get(key, initialState));

  useEventListener("storage", ({key: k, newValue}) => {
    if (k !== key) return;
    const newState = JSON.parse(newValue);
    state !== newState && setState(newState);
  });

  useEffect(() => {
    globalState.current = createGlobalState(key, setState, initialState);
    return () => globalState.current.deregister();
  }, [initialState, key]);

  const persistentState = useCallback((newState) => {
    const newStateValue = typeof newState === "function" ? newState(state) : newState;
    set(key, newStateValue);
    setState(newStateValue);
    globalState.current.emit(newState);
  }, [state, set, key]);

  return [state, persistentState];
};
const createGlobalState = (key, thisCallback, initialValue) => {
  if (!globalState[key]) globalState[key] = {callbacks: [], value: initialValue};
  // change to
  // globalState[key] ??= {callbacks: [], value: initialValue};
  globalState[key].callbacks.push(thisCallback);
  return {
    deregister() {
      const index = globalState[key].callbacks.indexOf(thisCallback);
      if (index > -1) globalState[key].callbacks.splice(index, 1);
    },
    emit(value) {
      if (globalState[key].value === value) return;
      globalState[key].value = value;
      globalState[key].callbacks.forEach(cb => thisCallback !== cb && cb(value));
    },
  };
};
const createStorage = (provider, encrypt) => {
  return encrypt
    ? {
      get(key, defaultValue) {
        const json = provider.getItem(key);
        return json === null || typeof json === "undefined"
          ? typeof defaultValue === "function"
          ? defaultValue()
          : defaultValue
        : Hash.decrypt(JSON.parse(json), encrypt.secret);
      },
      set(key, value) {
        provider.setItem(key, Hash.encrypt(JSON.stringify(value), encrypt.secret));
      }
    }
  : {
    get(key, defaultValue) {
      const json = provider.getItem(key);
      return json === null || typeof json === "undefined"
        ? typeof defaultValue === "function"
        ? defaultValue()
        : defaultValue
      : JSON.parse(json);
    },
    set(key, value) {
      provider.setItem(key, JSON.stringify(value));
    }
  };
};
const getProvider = () => typeof window !== "undefined" ? window.localStorage : null;
export const createPersistedState = (key, provider = getProvider(), encrypt) => {
  if (!provider) return useState;
  const storage = createStorage(provider, encrypt);
  return (initialState) => usePersistedState(initialState, key, storage);
};

export const createPersistedReducer = (key, provider = getProvider(), encrypt) => {
  if (!provider) return useReducer;
  const storage = createStorage(provider, encrypt);
  return (reducer, initialState) => usePersistedReducer(reducer, initialState, key, storage);
};
