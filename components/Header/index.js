// third party
import {useState, useEffect} from "react";
import Link from "next/link";
import Logo from "./Logo";
import HamMenu from "./HamMenu";
import PrimaryNav from "./PrimaryNav";
import Socials from "./Socials";
import {Login, LoggedIn} from "./Logins";
import ShopCart from "./ShopCart";
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

export default function Header() {
  const shopCartAmount = 0;

  return (
    <header className={style.header}>
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
      <section className={style.navSec}>
        <PrimaryNav primNav={nav.primary}/>
      </section>
      <section className={style.loginsSec}>
        <Login/>
        {/* <LoggedIn userNav={nav.user}/> */}
      </section>
    </header>
  );
}
