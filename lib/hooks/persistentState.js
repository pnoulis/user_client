import {useEffect, useState, useRef, useCallback} from "react";
import {Hash} from "lib/utils";


function createLocalStorage(name, options) {
  return options.encrypted ? {
    set(key, value) {
      try {
        window.localStorage.setItem(key, Hash.encrypt(JSON.stringify(value)));
      } catch (err) {
        console.log(err);
        window.localStorage.setitem(key, "");
      }
    },
    get: key => JSON.parse(Hash.decrypt(window.localStorage.getItem(key))),
    clear: () => window.localStorage.clear(),
  } : {
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.log(err);
        window.localStorage.setItem(key, "");
      }
    },
    get: key => JSON.parse(window.localStorage.getItem(key)),
    clear: () => window.localStorage.clear(),
  };
}
function createPersistentState(key = "persist", options = {}) {
  const persist = createLocalStorage(key, options);
  return (initial) => {
    const [state, setState] = useState(persist.get(key) || initial);
    useEffect(() => {
      persist.set(key, state);
    }, [state]);
    return [state, setState];
  }
}

const globalState = {};
const createGlobalState = (key, thisCallback, initialValue) => {
};


/*
  isolated capability of setting and getting persisted state
 */
const createStorage = (provider) => ({
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
  },
});

export const createPersistedState = (key) => {
  const storage = createStorage(window.localStorage);
  return (initialState) => usePersistedState(initialState, key, storage);
};

const usePersistedState = (initialState, key, {get, set}) => {
  const globalState = useRef(null);
  const [state, setState] = useState(() => get(key, initialState));
}

export const Seed = () => {
  const [state, setState] = useState(0);

  function handleIncrease() {
    setState(prev => {
      console.log(`thats the prev value ${prev}`);
      return prev + 1;
    });
  }

  function handleDecrease() {
    setState(prev => {
      console.log(`thats the prev value ${prev}`);
    })
  }
  return (
      <div>
      <p onClick={handleIncrease}><strong>+</strong></p>
      <p onClick={handleDecrease}><strong>-</strong></p>
      </div>
  );
};
const testUseState = () => {
  const [state, setState] = useState(0);
  return (
      <p>{state}</p>
  );
};
