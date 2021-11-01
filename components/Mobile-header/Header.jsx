// third party
import Link from "next/link";
import {useState, useRef, useEffect} from "react";
// own - components
import {Logo} from "./Logo";
import {HamMenu} from "./HamMenu";
import {PrimaryNav} from "./PrimaryNav";
import {Socials} from "./Socials";
import {Login, LoggedIn} from "./Logins";
import {ShopCart} from "./ShopCart";
// own - utilities
import {useGlobalContext} from "lib/context";
// style
import style from "./styles/header.module.scss";

const nav = {
  primary: [
    {href: "/", name: "home"},
    {href: "/company", name: "company"},
    {href: "/something", name: "something"},
    {href: "/shop", name: "shop", secondary: [
      {href: "/products/meat", name: "meat"},
      {href: "/products/fish", name: "fish"},
      {href: "/products/vegetables", name: "vegetables"},
    ]},
  ],
  user: [
    {href: "/account", name: "account"},
    {href: "/logout", name: "logout"},
  ],
  socials: {
    facebook: {href: "/facebook"},
    instagram: {href: "/instagram"},
  },
  logo: {href: "/logo/google_logo.png"},
};

export function Header() {
  const
  {gstate} = useGlobalContext(),
  shopCartAmount = gstate.shoppingCart.amount || 0,
  [height, setContentHeight] = useState(0),
  [padding, setPadding] = useState({}),
  navRef = useRef();


  // used to handle the change in landscape and the
  // re calculating of the padding., I could have
  // used the orientation interface, but there is no
  // way to test it in firefox's developers console.
  // so for the time being this will do
  // it is a very bad way to handle it, but it is
  // an edge case.
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setTimeout(() => location.reload());
    });
  }

    function calculatePadding() {
    // in order to allow for the dropdowns to not push
    // the content on +y axis and instead push it on -y axis
    // padding must replace the empty space both below and
    // above the content.

    if (!navRef.current) return;
    const navRefHeight = navRef.current.clientHeight,
          contentHeight = height;
    let padding = (navRefHeight - contentHeight) / 2;
    padding = padding < 30 ? 70 : padding;
    padding = {paddingTop: padding, paddingBottom: padding};
    setPadding(padding);
  }

  useEffect(() => {
    if (!height) return null;
    calculatePadding();
  }, [height]);

  return (
    <header onClick={() => location.reload()} className={style.header}>
      <section className={style.logoSec}>
        <Logo logo={nav.logo}/>
      </section>
      <section className={style.shopSec}>
        <ShopCart amount={shopCartAmount}/>
      </section>
      <section className={style.hamSec}>
        <HamMenu/>
      </section>
      <section className={style.socialsSec}>
        <Socials socials={nav.socials}/>
      </section>
      <section  style={padding} ref={navRef} className={style.navSec}>
        <PrimaryNav onMount={setContentHeight} primNav={nav.primary}/>
      </section>
      <section className={style.loginsSec}>
        <Login/>
        {/* <LoggedIn userNav={nav.user}/> */}
      </section>
    </header>
  );
}
