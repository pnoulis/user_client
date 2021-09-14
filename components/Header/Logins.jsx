// third party
import Link from "next/link";
import {useState} from "react";
// own - utilities
import {useStyle, useHover} from "lib/hooks";
// own - components
import DropDown from "./Dropdown";
// style
import style from "./styles/logins.module.scss";
import dropStyle from "./styles/loginNav.module.scss";


const styleReducer = (params) => {
  let config = {};
  config.show = params.show;
  return config;
};

export function LoggedIn({user, userNav}) {
  const
  [mobileTouched, setMobileTouched] = useState(false),
  {hovered, bindHover} = useHover(),
  setStyle = useStyle(style, {show: mobileTouched || hovered}, styleReducer);

  return (
    <ul {...bindHover} className={style.loggedIn}>
      <p
        onTouchStart={() => setMobileTouched(!mobileTouched)}
        className={setStyle(["show"], "user")}>
        <span>{user || "pavlos"}</span>
        <img src="/user-success.png" alt="user-icon"/>
      </p>
      <DropDown
        show={mobileTouched}
        style={dropStyle}
        navs={userNav}/>
    </ul>
  );
}
export function Login() {
  return (
    <div className={style.login}>
      <Link href="/login">
        <a>login</a>
      </Link>
      <Link href="/register">
        <a>register</a>
      </Link>
    </div>
  );
}
