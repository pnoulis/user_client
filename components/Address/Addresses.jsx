// third party
import React, {useState, useEffect} from "react";
// own - components
import {NewAddress, OldAddresses, CurrentAddress} from "./Containers.jsx";
// style
import style from "./styles/addresses.module.scss";

export const addressesContext = React.createContext({
  setAddresses: () => {},
});

export function Addresses(props) {
  const [addresses, setAddresses] = useState(props.addresses || []),
        [selection, setSelection] = useState(!props.addresses.length ? {cont: "new", address: ""}: {cont: "current", address: addresses.filter(a => a.active).pop() || addresses[0]}),
        currentAddress = addresses.filter(a => a.active).pop() || addresses[0] || false,
        oldAddresses = addresses.filter(a => !a.active && a._id !== currentAddress._id);

  function handleSelection(id) {
    setSelection(id);
  }

  useEffect(() => {
    if (!addresses.length) return setSelection({cont: "new", address: ""});
    setSelection({cont: "current", address: addresses.filter(a => a.active).pop() || addresses[0] || ""});
  }, [addresses]);

  useEffect(() => {
    if (props.onSelection) props.onSelection(selection.address);
  }, [selection]);


  if (!currentAddress) return (
    <addressesContext.Provider value={{setAddresses,}}>
      <article className={style.addresses}>
        <NewAddress id="new"
                    onSelection={handleSelection}
                    selected={selection.cont === "new"}/>
      </article>
    </addressesContext.Provider>
  ); else if (!oldAddresses.length) return (
    <addressesContext.Provider value={{setAddresses,}}>
      <article className={style.addresses}>
        <CurrentAddress id="current"
                        address={currentAddress}
                        onSelection={handleSelection}
                        selected={selection.cont === "current"}/>
        <NewAddress id="new"
                    onSelection={handleSelection}
                    selected={selection.cont === "new"}/>
      </article>
    </addressesContext.Provider>
  ); else return (
    <addressesContext.Provider value={{setAddresses,}}>
      <article className={style.addresses}>
        <CurrentAddress id="current"
                        address={currentAddress}
                        onSelection={handleSelection}
                        selected={selection.cont === "current"}/>
        <OldAddresses id="old"
                      addresses={oldAddresses}
                      onSelection={handleSelection}
                      selection={selection}
                      selected={selection.cont === "old"}/>
        <NewAddress id="new"
                    onSelection={handleSelection}
                    selected={selection.cont === "new"}/>
      </article>
    </addressesContext.Provider>
  );
}

