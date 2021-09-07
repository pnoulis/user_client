// third party
import {useState, useEffect} from "react";
import Link from "next/link";
// style
import style from "./styles/socials.module.scss";

export function Socials({location}) {

  // function googleLogin(e) {
  //   e.preventDefault();
  //   const currentLocation = location.pathname,
  //         searchParams = new URLSearchParams(
  //           {"originalUrl": currentLocation,
  //            "loginMethod": "socials"},
  //         );
  // }
  return (
    <div className={style.socials}>
      <p className={style.orLogin}>
        {`or ${location} with:`}
      </p>
      <GoogleLogin/>
      <FacebookLogin/>
    </div>
  );
}


function GoogleLogin() {
  return (
    <div className={style.social}>
      <Link href="/login/google">
        <a><img src="/socials/google.svg" alt="google-logo"/></a>
      </Link>
    </div>
  );
}

function FacebookLogin() {
  return (
    <div className={style.social}>
      <Link href="/login/facebook">
        <a><img src="/socials/facebook.svg" alt="facebook-logo"/></a>
      </Link>
    </div>
  );
}
