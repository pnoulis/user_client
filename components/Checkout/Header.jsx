// third party
import Link from "next/link";
// own - utilities
import {useStyle} from "lib/hooks";
// style
import style from "./styles/header.module.scss";

const styleRed = (params) => {
  let config = {};
  return config;
};
// usid
const usid = "60b79a7ec60fa31cb4da75f3";


export function Header({location}) {
  const setStyle = useStyle(style, {location}, styleRed);
  return (
    <header className={style.header}>
      <nav className={style.nav}>
          <Link href="/">
            <a className={style.logo}>
              <img src="/logo/google_logo.png" alt="company-logo"/>
            </a>
          </Link>
        <Link href={`/checkout/delivery/${usid}`}>
          <a className={style.link}>
            <span className={style.linkImg}>
              <img src="/checkout/location-black-outlined-64.png" alt="icon-of-a-truck"/>
            </span>
            <span className={style.linkText}>delivery</span>
          </a>
        </Link>
        <Link href={`/checkout/review/${usid}`}>
          <a className={style.link}>
            <p className={style.linkImg}>
              <img src="/checkout/like-black-outlined-64.png" alt="thumbs-up-icon"/>
            </p>
            <p className={style.linkText}>review</p>
          </a>
        </Link>
        <Link href={`/checkout/payment/${usid}`}>
          <a className={style.link}>
            <p className={style.linkImg}>
              <img src=" /checkout/creditCard-black-outlined-64.png" alt="icon-of-a-credit-card"/>
            </p>
            <p className={style.linkText}>payment</p>
          </a>
        </Link>

      </nav>
    </header>
  );
}
