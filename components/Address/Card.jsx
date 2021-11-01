// own components
import {NotBeingEdited} from "components/Fields";

// styles
import style from "./styles/card.module.scss";

export function Card({address}) {
  return (
    <ul className={style.card}>
      <li className={style.street}>{address.street}</li>
      <li className={style.city_region}>
        <span className={style.city}>{address.city},</span>
        <span className={style.region}>{address.region}</span>
      </li>
      <li className={style.country_fullname}>
        <span className={style.country}>{address.country}</span>
        <span className={style.fullname}>{address.fullname}</span>
      </li>
      <li className={style.postcode}>{address.postcode}</li>
      <li className={style.email}>{address.email}</li>
      <li className={style.mobile}>{address.mobile}</li>
      <li className={style.comment}>
        <img src="/left-quote.svg" alt="left-quote-sign"/>
        {address.comment}
        <img src="/right-quote.svg" alt="right-quote-sign"/>
      </li>
      {/* <li className={style.togglesContainer}> */}
      {/*   <NotBeingEdited style={style}/> */}
      {/* </li> */}
    </ul>
  );
}
