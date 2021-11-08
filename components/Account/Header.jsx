import Link from "next/link";
import {useStyle} from "lib/hooks";
import style from "./styles/header.module.scss";

// usid
const usid = "60b79a7ec60fa31cb4da75f3";

const styleRed = (params) => {
  let config = {};
  config[params.location] = true;
  return config;
};

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
        <Link href={"/account"}>
          <a className={style.link}>
            <span className={style.linkImg}>
              <img src="/account/account-black-outlined-64.png" alt="icon-of-a-man"/>
            </span>
            <span className={style.linkText}>account</span>
          </a>
        </Link>
        <Link href={"/account/addresses"}>
          <a className={style.link}>
            <p className={style.linkImg}>
              <img src="/account/location-black-outlined-64.png" alt="location-icon"/>
            </p>
            <p className={style.linkText}>addresses</p>
          </a>
        </Link>
        <Link href={"/account/orders"}>
          <a className={style.link}>
            <p className={style.linkImg}>
              <img src="/account/crate-black-outlined-64.png" alt="icon-of-a-package-box"/>
            </p>
            <p className={style.linkText}>orders</p>
          </a>
        </Link>
      </nav>
    </header>
  );
}
