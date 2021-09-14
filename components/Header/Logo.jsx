// third party
import Link from "next/link";
// style
import style from "./styles/logo.module.scss";

export default function Logo({logo}) {
  return (
    <div className={style.logo}>
      <Link href="/">
        <a><img src={logo.href} alt="company-logo"/></a>
      </Link>
    </div>
  );
}
