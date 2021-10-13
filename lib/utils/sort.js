import React, {useState, useContext} from "react";
function findValue(anObject, key) {
  const properties = key.split(".");
  if (properties.length < 2) return anObject[properties[0]];
  const followProperty = () => {
    if (!properties.length) return anObject;
    anObject = anObject[properties.shift()];
    return followProperty();
  };
  return followProperty();
};
function merge(left, right, compareFn) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(
      compareFn(left[i], right[j]) === -1 ? left[i++] : right[j++]
    );
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
function mergeSort(array, compareFn) {
  if (array.length > 1) {
    const {length} = array,
          middle = Math.floor(length / 2),
          left = mergeSort(array.slice(0, middle), compareFn),
          right = mergeSort(array.slice(middle, length), compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}
function incr(key) {
  if (key.split(".").length > 1) {
    return (a, b) => (findValue(a, key) === findValue(b, key)) ? 0 :
      (findValue(a, key) > findValue(b, key)) ? -1 : 1;
  }
  return (a, b) => (a[key] === b[key]) ? 0 :
    (a[key] > b[key]) ? -1 : 1;
}

function decr(key) {
  if (key.split(".").length > 1) {
    return (a, b) => (findValue(a, key) === findValue(b, key)) ? 0 :
      (findValue(a, key) < findValue(b, key)) ? -1 : 1;
  }
  return (a, b) => (a[key] === b[key]) ? 0 :
    (a[key] < b[key]) ? -1 : 1;
}

const
SORTING_KEYS = {
  inStock: [
    {category: "inStock", key: true},
    {category: "inStock", key: false},
  ],
  order: [
    {category: "order", key: "incr", arg: ""},
    {category: "order", key: "decr", arg: ""},
  ],
  search: [
    {category: "search", key: "tag", arg: []}
  ],
},
SORTING_FUNCTIONS = {
  inStock: {
    true: (array = []) => array.filter(el => el.inStock),
    false: (array = []) => array.filter(el => !el.inStock),
  },
  order: {
    incr: (key, array = []) => mergeSort(array, decr(key)),
    decr: (key, array = []) => mergeSort(array, incr(key)),
  },
  search: {
    tag: (tags) => (array) => {
      let matches = [];
      const filtered = array.filter(el => {
        matches = el.tags.filter(t => {
          matches = tags.filter(ta => ta === t.tag);
          if (matches.length) return matches.pop();
        });
        if (matches.length === tags.length) return el;
      });
      return filtered;
    },
  },
},
sortContext = React.createContext({
  order: null,
  inStock: null,
  search: {},
  dispatch: () => {},
}),
useSortContext = () => useContext(sortContext),
SORT_SCHEMA= {
  order: {},
  inStock: {},
  search: {},
  SORTING_KEYS: {},
},
actions = (state, setState, initialState) => (action) => {
  const ACTIONS = {
    clear() {
      return setState(SORT_SCHEMA);
    },
    apply() {
    },
    setSort(sort) {
      sort.fn = SORTING_FUNCTIONS[sort.category][sort.key];
      if (typeof sort.fn() === "function") {
        sort.fn = sort.fn(sort.arg);
      }
      return setState({
        ...state,
        [sort.category]: sort,
      });
    },
    clearSort(sortCategory) {
      return setState({...state, [sortCategory]: {}});
    }
  };
  return ACTIONS[action];
},
useStore = (initialState) => {
  const
  [state, setState] = useState(initialState),
  dispatch = actions(state, setState, initialState);
  return {sstore: state, sdispatch: dispatch};
};

export {
  useStore,
  SORT_SCHEMA,
  sortContext,
  useSortContext,
  SORTING_KEYS,
  SORTING_FUNCTIONS,
};

