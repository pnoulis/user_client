// third party
import Link from "next/link";
import {useState} from "react";
// own - utilities
import  {useHover, useStyle} from "lib/hooks";
// own - components
import DropDown from "./Dropdown";
// style
import style from "./styles/primaryNav.module.scss";
import dropStyle from "./styles/secNav.module.scss";

const styleReducer = (params) => {
  let config = {};
  config.show = params.show;
  return config;
};

export default function PrimaryNav({primNav}) {
  const [mobileTouched, setMobileTouched] = useState(false),
        {hovered, bindHover} = useHover(),
        setStyle = useStyle(style, {show: mobileTouched || hovered}, styleReducer);

  return (
    <ul className={style.nav}>
      {primNav.map((nav, i) => {
        if (nav.secondary) {
          return (
            <li {...bindHover} className={style.navItem} key={i}>
              <a onTouchStart={() => setMobileTouched(!mobileTouched)}
                 className={setStyle(["show"], "navLink")}>{nav.name}</a>
              <DropDown
                style={dropStyle}
                show={mobileTouched}
                navs={nav.secondary}/>
            </li>
          );
        } else {
          return (
            <li className={style.navItem} key={i}>
              <Link href={nav.href}>
                <a className={style.navLink}>{nav.name}</a>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
