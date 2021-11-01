// third party
import {useState} from "react";
// own - components
import {ToggleableForm} from "./ToggleableForm";
import {Indicator} from "./Indicator";
// own - utilities
import {useStyle} from "lib/hooks";
// styles
import style from "./styles/containers.module.scss";
import sindi from "./styles/indicator.module.scss";


const styleReducer = (params) => {
  let config = {};
  if (params.selected) config.selected = true;
  return config;
};

export function OldAddresses({id, addresses, onSelection, selection, selected}) {
  const [addr, setAddrSelection] = useState(""),
        setStyle = useStyle(style, {selected}, styleReducer);

  if (selected) return ( // if selected show addresses
    <section
      onClick={() => onSelection({cont: "old"})}
      className={setStyle(["selected"], style.container) + " " + style.oldContainer}>
      <Indicator selected={selected && selection.address && selection.address._id}/>
      <div className={style.oldAddressesContainer}>
        {addresses.map((a, i) => (
          <OldAddress key={i} address={a} onSelection={onSelection} selection={selection}/>
        ))}
      </div>
    </section>
  ); else return ( // else show headers
    <section
      onClick={() => onSelection({cont: "old"})}
      className={setStyle(["selected"], style.container) + " " + style.oldContainer}>
      <Indicator selected={selected}/>
      <p className={style.header}>old addresses</p>
    </section>
  );
}

function OldAddress({address, onSelection, selection}) {
  return (
    <article
      onClick={(e)  => {e.stopPropagation(); onSelection({cont: "old", address,});}}
      className={style.oldAddress}>
      <Indicator selected={selection.address && selection.address._id ===  address._id}
                 otherClass={sindi.oldIndicator}/>
      <ToggleableForm address={address}/>
    </article>
  );
}

export function CurrentAddress({id, address, onSelection, selected}) {
  const setStyle = useStyle(style, {selected}, styleReducer);
  if (selected) return (
    <section
      onClick={() => onSelection({cont: "current", address,})}
      className={setStyle(["selected"], style.container) + " " + style.currentContainer}>
      <Indicator selected={selected}/>
      <ToggleableForm address={address}/>
    </section>
  ); else return (
    <section onClick={() => onSelection({cont: "current", address,})}
             className={setStyle(["selected"], style.container) + " " + style.currentContainer}>
      <Indicator selected={selected}/>
      <div className={style.activeAdrHeader}>
        <p>
          <span className={style.street}>{address.street},</span>
          <span className={style.postcode}>{address.postcode}</span>
        </p>
        <p>
          <span className={style.email}>{address.email},</span>
          <span className={style.mobile}>{address.mobile}</span>
        </p>
      </div>
    </section>
  );
}
export function NewAddress({id, onSelection, selected}) {
  const setStyle = useStyle(style, {selected}, styleReducer);
  if (selected) return (
    <section
      onClick={() => onSelection({cont: "new"})}
      className={setStyle(["selected"], style.container) + " " + style.newContainer}>
      <ToggleableForm/>
    </section>
  ); else return (
    <section
      onClick={() => onSelection({cont: "new"})}
      className={setStyle(["selected"], style.container) + " " + style.newContainer}>
      <Indicator selected={selected}/>
      <p className={style.header}>new address</p>
    </section>
  );
}

