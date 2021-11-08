import {useEffect, uesState} from "react";
import Router from "next/router";
import Link from "next/link";
import {APP_STORE} from "lib/stores";
import {useResources} from "lib/resources";
import getSocials from "components/Socials";
import * as S from "./styles";
import Navigation from "./Navigation";
import {Account, Login} from "./User";
const Socials = getSocials("pages", 1);
const {useAppContext, appProvider} = APP_STORE;

export default function Header() {
  const { header } = useResources("header");
  const { app, setApp } = useAppContext();

  function handleClose(e) {
    e.preventDefault();
    window.history.length > 2
      ? window.history.back()
      : Router.push("/");
  }

  return !header ? null : (
    <S.Header>
      <Link href="/">
        <S.LogoWrapper>
          <img src={header.logo} alt="company-logo"/>
        </S.LogoWrapper>
      </Link>
      <Link href="/checkout">
        <S.CartWrapper cart={app.cart.meta.amount}>
          <img src="/shopCart/shopping-cart-128px.png" alt="cart-icon"/>
          <span><span className="cartHolder">{app.cart.meta.amount}</span></span>
        </S.CartWrapper>
      </Link>
      <S.ToggleWrapper onClick={handleClose}>
        <img src="/header/close-black-filled-64px.png" alt="close-icon"/>
      </S.ToggleWrapper>
      <S.SocialsWrapper>
        <Socials size={35}/>
      </S.SocialsWrapper>
      <Navigation primNav={header.nav}/>
    {app.loggedIn ? <Account userNav={header.user}/> : <Login/>}
    </S.Header>
  );
}
