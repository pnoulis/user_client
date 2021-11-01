// third party
import Link from "next/link";
// own - components
import {LoginDashboard} from "components/Auth";
import {Header} from "./Header";
// style
import style from "./styles/login.module.scss";



export function CheckoutLogin() {
  return (
    <div className={style.loginPage}>
      <div className={style.headerContainer}>
        <Header/>
      </div>
      <div className={style.bodyContainer}>
        <div className={style.guestContainer}>
          <Guest/>
        </div>
        <div className={style.loginContainer}>
          <LoginDashboard/>
        </div>
      </div>
    </div>
  );
}

function Guest() {
  return (
    <div>
      <Link href={`/checkout/delivery/${"guest"}`}>
        <a className={style.guestButton}>
          <span>Checkout as a guest</span>
          <img src="/right-arrow-angle-white.png" alt="right-arrow"/>
        </a>
      </Link>
    </div>
  );
}
