// third party
import Link from "next/link";
// style
import style from "./styles/shopcart.module.scss";


const
digitStyle = {
  empty: {width: 0, height: 0, padding: 0},
  one: {width: "25px", heigth: "9px",
        left: "-15px", top: "-15px"},
  two: {width: "30px", height: "25px", left: "-20px",
        top: "-15px"},
  three: {width: "35px", height: "25px",
          padding: "4px 5px 4px 2px",
          left: "-27px", top: "-18px"},
};

export default function ShopCart({amount = 0}) {

  function calcStyle() {
    if (!amount) return digitStyle.empty;
    if (amount < 10) return digitStyle.one;
    if (amount < 100) return digitStyle.two;
    return digitStyle.three;
  }
  return (
    <div className={style.shopCart}>
      <Link href="/shoppingCart">
        <a style={{backgroundColor: amount && "white"}}>
          <img src="/shopCart/shopping-cart-128px.png"/>
          <span style={calcStyle()}>{amount || ""}</span>
        </a>
      </Link>
    </div>
  );
}
