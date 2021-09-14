// third party
import Link from "next/link";
// own - utilities
import {useStyle} from "lib/hooks";

const styleReducer = (params) => {
  let config = {};
  config.show = params.show;
  return config;
};

export default function DropDown({show, style = {}, navs}) {
  const setStyle = useStyle(style, {show}, styleReducer);

  return (
    <ul className={setStyle(["show"], "dropdown")}>
      {navs.map((nav, i) => (
        <li key={i} className={setStyle([], "item")}>
          <Link href={nav.href || ""}>
            <a className={setStyle([], "link")}>{nav.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
