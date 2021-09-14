// third party
import Link from "next/link";
// style
import style from "./styles/hamMenu.module.scss";
export default function HamMenu() {
  return (
    <div className={style.ham}>
      <Link href="/mobile">
        <a>
          <span></span>
          <span></span>
          <span></span>
        </a>
      </Link>
    </div>
  );
}
