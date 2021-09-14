// third party
import Link from "next/link";
// style
import style from "./styles/socials.module.scss";

export default function Socials({socials}) {
  return (
    <div className={style.socials}>
      <Link href={socials.instagram.href || "/"}>
        <a>
          <img src="/socials/instagram-filled.svg" alt="instagram-logo"/>
        </a>
      </Link>
      <Link href={socials.facebook.href || "/"}>
        <a>
          <img src="/socials/facebook-filled.svg" alt="facebook-logo"/>
        </a>
      </Link>
    </div>
  );
}
