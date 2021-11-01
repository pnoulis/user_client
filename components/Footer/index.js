// third party
import Link from "next/link";
import {useResources} from "lib/resources";
import getSocials from "components/Socials";
// own - utilities
// import {produceSocials, produceAddress} from "components/DynamicData";
// style
import style from "./styles/footer.module.scss";

const Socials = getSocials("pages", 1);
export default function Footer() {
  const { footer } = useResources("footer");
  return !footer ? null : (
  <footer className={style.footer}>
      <div className={style.secNav}>
        <ul className={style.navList}>
          <li className={style.headerLitem}><h4 className={style.header}>about</h4></li>
          {footer.about.map((nav, i) => (
            <li key={i} className={style.navLitem}>
              <Link href={nav.href}>
                <a className={style.link}>{nav.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.secNav}>
        <ul className={style.navList}>
          <li className={style.headerLitem}><h4 className={style.header}>legals</h4></li>
          {footer.legals.map((legal, i) => (
            <li key={i} className={style.navLitem}>
              <Link href={legal.href}>
                <a className={style.link}>{legal.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.secCompany}>
        <p className={style.logo}>
          <Link href="/"><a className={style.logoLink}><img src={footer.logo} alt="company-logo"/></a></Link>
        </p>
        <div className={style.address}>
          <span className={style.street}>
            {footer.branch.street}
          </span>
          <span className={style.postcode}>
            {footer.branch.postcode}
          </span>
          <p className={style.citycountry}>
            <span className={style.city}>{footer.branch.city},</span>
            <span className={style.country}>{footer.branch.country}</span>
          </p>

          <p className={style.mobile}>
            {footer.branch.phones.map((phones, i) => (
              <span key={i}>{phones}</span>
            ))}
          </p>
          <p className={style.emails}>
            <span>{footer.email}</span>
          </p>
        </div>
      </div>

      <div className={style.secConnect}>
        <div className={style.connect}>
          <span className={style.withus}>connect with us:</span>
          <div className={style.socialLink}>
            <Socials size={30}/>
          </div>
        </div>
      </div>
      <div className={style.secCopyrights}>
        <p className={style.copyrights}>
          <span className={style.copy}>&copy; {footer.copyright}</span>
          <span className={style.created}>{footer.createdBy}</span>
        </p>
      </div>
    </footer>
  );
}
