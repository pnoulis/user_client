import {useEffect, useState} from "react";
import {Dimensions} from "lib/utils";
import Router from "next/router";
import Link from "next/link";
import Navigation from "./Navigation";
import {Account, Login} from "./User";
import {APP_STORE} from "lib/stores";
import * as S from "./Styles";

const nav = {
  primary: [
    {href: "/", name: "home"},
    {href: "/company", name: "company"},
    {href: "/something", name: "something"},
    {href: "/shop", name: "shop", secondary: [
      {href: "/products/meat/1", name: "meat"},
      {href: "/products/fish/1", name: "fish"},
      {href: "/products/vegetables/1", name: "vegetables"},
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
  const
  [sticky, setSticky] = useState({position: "static"}),
  [menu, setMenu] = useState(false),
  {app} = APP_STORE.useAppContext();

  useEffect(() => {
    const makeSticky = onMobileScroll(setSticky);
    makeSticky();
    window.addEventListener("scroll", makeSticky);
    return () => window.removeEventListener("scroll", makeSticky);
  }, []);

  return (
    <S.Header {...sticky}>
      <Link href="/">
        <S.LogoWrapper {...sticky}>
          <img src="/logo/google_logo.png" alt="company-logo"/>
        </S.LogoWrapper>
      </Link>
      <Link href="/cart">
        <S.CartWrapper {...sticky} cart={app.cart.meta.total}>
          <img src="/shopCart/shopping-cart-128px.png" alt="cart-icon"/>
          <span><span className="cartHolder">{app.cart.meta.total}</span></span>
        </S.CartWrapper>
      </Link>
      <Link href="/mobile">
        <S.ToggleWrapper {...sticky}>
          <span></span>
          <span></span>
          <span></span>
        </S.ToggleWrapper>
      </Link>
      <S.SocialsWrapper {...sticky}>
        <Link href="/">
          <a>
            <img src="/socials/instagram-filled.svg" alt="instagram-logo"/>
          </a>
        </Link>
        <Link href="/">
          <a>
            <img src="/socials/facebook-filled.svg" alt="facebook-logo"/>
          </a>
        </Link>
      </S.SocialsWrapper>
      <Navigation primNav={nav.primary}/>
      {app.loggedIn ? <LoggedIn userNav={nav.user}/> : <Login/>}
    </S.Header>
  );
}

function onMobileScroll(setSticky) {
  let reduced = false, sticky = false;
  return () => {
    if (window.innerWidth > 1100 && sticky){
      sticky = false;
      return setSticky({position: "static"});
    }
    if (window.innerWidth < 1100 && !sticky) {
      sticky = true;
      return setSticky({position: "sticky"});
    }
    if (window.scrollY > 50 && !reduced && sticky) {
      reduced = true;
      return setSticky({position: "sticky", reduce: true});
    }
    if (window.scrollY < 50 && reduced && sticky) {
      reduced = false;
      return setSticky({position: "sticky", reduce: false});
    }
    return undefined;
  };
}
