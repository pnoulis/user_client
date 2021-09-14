import ReactDOM from "react-dom";

export
const
mount = (element) => {
  ReactDOM.render(element, document.getElementById("main-content"));
},
persistentState = {};
persistentState.set = function(name, state) {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(name, JSON.stringify(state));
  }
  return state;
};

persistentState.get = function(name) {
  if (typeof window !== "undefined") {
    try {
      // return JSON.parse(window.localStorage.getItem(name));
      const haha = JSON.parse(window.localStorage.getItem(name));
      console.log("within persistent state");
      console.log(haha);
      return haha;
    } catch (err) {
      console.log("within persistent state");
      alert(err);
      return null;
    }
  }
  return null;
};
persistentState.clear = function() {
  if (typeof window !== "undefined") {
    return window.localStorage.clear();
  }
  return null;
};
