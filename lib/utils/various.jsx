import ReactDOM from "react-dom";
import {Hash} from "lib/utils";

export
const
mount = (element) => {
  ReactDOM.render(element, document.getElementById("main-content"));
},
tabs = {},
persistentState = {};
persistentState.set = function(name, state) {
  if (typeof window === "undefined") return null;

  try {
    window.localStorage.setItem(name, Hash.encrypt(JSON.stringify(state)));
  } catch (err) {
    window.localStorage.setItem(name, "");
  }
  return null;
};

persistentState.get = function(name) {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(Hash.decrypt(window.localStorage.getItem(name)));
  } catch (err) {
  }
  return null;
};
persistentState.clear = function() {
  if (typeof window !== "undefined") {
    return window.localStorage.clear();
  }
  return null;
};

tabs.notify = function(name, state) {
  setTimeout(() => {
    persistentState.set(name, state);
  }, 2000);
};

tabs.listenForChanges = function(name, dispatcher) {
  if (window === "undefined") return null;
  if (!(dispatcher) instanceof Function) throw new Error("listenForChanges needs a dispatcher");
  function handleStorageEvent() {
    const tabState = persistentState.get(name);
    if (!tabState) {
      window.removeEventListener("storage", handleStorageEvent);
      window.location.reload();
    }
    else dispatcher("tabChange", tabState);
  }

  window.addEventListener("storage", handleStorageEvent);
};

export function rapidEventQueue(config) {
  const events = [];
  return () => {
    events.push(setTimeout(config.run, config.time));
    events.length > 1 && clearTimeout(events.shift());
  };
}
