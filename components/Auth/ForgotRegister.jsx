// third party
import Link from "next/link";
// style
import style from "./styles/forgotRegister.module.scss";

export function ForgotRegister() {
  return (
    <div className={style.forgotRegister}>
      <Link href="/recovery/email">
        <p>
          <a className={style.anchor}>forgot password</a>
        </p>
      </Link>
      <Link href="/register">
        <p>
          <a className={style.anchor}>register</a>
        </p>
      </Link>
    </div>
  );
}
