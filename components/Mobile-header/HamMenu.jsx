// third party
import Link from "next/link";
// style
import style from "./styles/hamMenu.module.scss";
export function HamMenu() {
  return (
    <div className={style.ham}>
      <Link href="/mobile">
        <a>
          <img src="/header/close-black-filled-64px.png" alt="close-icon"/>
        </a>
      </Link>
    </div>
  );
}
