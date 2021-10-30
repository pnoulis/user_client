// third party
import Link from "next/link";
// own - utilities
// import {produceSocials, produceAddress} from "components/DynamicData";
// style
import style from "./styles/footer.module.scss";

const data = {
  copyright: "2021 lild all rights reserved",
  created: "strix",
  address: {
    street: "leoforos oxi 12",
    city: "bristol",
    region: "south gloucesteshire",
    postcode: "bs5 se",
    country: "uk"
  },
  socials: {
    facebook: {href: "/facebook"},
    instagram: {href: "/instagram"},
  },
  about: [
    {href: "/blog", name: "blog"},
    {href: "/contact", name: "contact"},
    {href: "/info/countriesOfOperation", name: "countries of operation"},
    {href: "/info/history", name: "history"},
    {href: "/info/missionStatement", name: "mission statement"},
  ],
  legals: [
    {href: "/legals/payment", name: "payment"},
    {href: "/legals/returnsPolicy", name: "returns policy"},
    {href: "/legals/privacyPolicy", name: "privacy policy"},
    {href: "/legals/terms&Conditions", name: "terms & conditions"},
  ],
  logo: {href: "/logo/google_logo.png"},
};
export default function Footer() {
  return (
    <>
      <p>hey iam the footer</p>
    </>
  );
}
// function FOooter() {

//   return (
//     <footer className={style.footer}>
//       <section className={style.secNav}>
//         <ul className={style.navList}>
//           <li className={style.headerLitem}><h4 className={style.header}>about</h4></li>
//           {data.about.map((nav, i) => (
//             <li key={i} className={style.navLitem}>
//               <Link href={nav.href}>
//                 <a className={style.link}>{nav.name}</a>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </section>
//       <section className={style.secNav}>
//         <ul className={style.navList}>
//           <li className={style.headerLitem}><h4 className={style.header}>legals</h4></li>
//           {data.legals.map((legal, i) => (
//             <li key={i} className={style.navLitem}>
//               <Link href={legal.href}>
//                 <a className={style.link}>{legal.name}</a>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </section>
//       <section className={style.secCompany}>
//         <p className={style.logo}>
//           <Link href="/"><a className={style.logoLink}><img src={data.logo.href} alt="company-logo"/></a></Link>
//         </p>
//         {produceAddress(style)}
//       </section>

//       <section className={style.secConnect}>
//         <p className={style.connect}>
//           <span className={style.withus}>connect with us:</span>
//           {produceSocials(data.socials, style)}
//         </p>
//       </section>
//       <section className={style.secCopyrights}>
//         <p className={style.copyrights}>
//           <span className={style.copy}>&copy; {data.copyright}</span>
//           <span className={style.created}>created by strix</span>
//         </p>
//       </section>
//     </footer>
//   );
// }

