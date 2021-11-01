// third party
import {useEffect} from "react";
// own - utilities
import {useBackend} from "lib/hooks";
// style
import style from "./styles/review.module.scss";

// this button is the one that lands in the Review page
// it is used by the Delivery Page
export function ReviewButton({delivery}) {
  const {res, Loading, Success, sendReq} = useBackend();

  function proceedCheckout() {
    if (!delivery) return null;
    sendReq({method: "post", url: "/order", payload: delivery});
  }

  useEffect(() => {
    if (!Object.keys(res).length) return null;
    console.log(res);
  }, [res]);


  return (
    <div onClick={proceedCheckout} className={style.reviewButton}>
      <span>review</span>
      <img src="/right-arrow-angle-white.png" alt="right-arrow"/>
      <img src="/right-arrow-angle-white.png" alt="right-arrow"/>
    </div>
  );
}
