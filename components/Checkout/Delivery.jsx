// third party
import {useState, useEffect} from "react";
// own - components
import {Addresses} from "components/Address";
import {ReviewButton} from "./Review";
import {Header} from "./Header";
// style
import style from "./styles/delivery.module.scss";


export function Delivery({addresses}) {
  const [delivery, setDelivery] = useState({});

  return (
    <div className={style.deliveryPage}>
      <div className={style.headerContainer}>
        <Header/>
      </div>
      <div className={style.bodyContainer}>
        <div className={style.reviewContainer}>
          <ReviewButton/>
        </div>
        <div className={style.addressesContainer}>
          <Addresses addresses={addresses}/>
        </div>
      </div>
    </div>
  );
}


// this button is the one that lands in the Delivery page
// it is utilized by the Login page
export function DeliveryButton() {
  return (
    <div>
      <p>Delivery</p>
    </div>
  );
}
