import {useEffect} from "react";
import * as Styles from "./Styles";
import {useBackend, renderStatus} from "lib/hooks";
import {Product} from "./Product";
import {APP_STORE} from "lib/stores";
import Dock from "components/Docker";
import {Hide, Size, Slider, SliderCard} from "components/Slider";

const loadingStyle = {
  outer: {
    boxSizing: "content-box",
    padding: "50px",
    backgroundColor: "black",
    borderRadius: "50%",
    boxShadow: "0 0 10px var(--color-semantic)",
  },
};

export default function Products({products}) {
  const {setReq, status, res} = useBackend(),
        {app, setApp} = APP_STORE.useAppContext();

  function requestStock(id) {
    setReq({method: "post", url: "/cart-add", payload: {
      pid: products[id].pid,
      amount: 1,
    }});
  }

  useEffect(() => {
    if (!res) return null;
    if (!res.payload.amount) return setApp("addFlash", {flashId: "FOutOfStock"});
    setApp("addCart", res.payload);
    setTimeout(() => setApp("addFlash", {flashId: "FCheckout"}), 500);
  }, [res]);

  return status("loading") ?
    <Styles.LoadingScreen>{renderStatus(status("loading"), loadingStyle)}</Styles.LoadingScreen> :
    <Styles.Root>
      {products.map((pr, i) => (
        i < 7 && <Product key={i} id={i} product={pr} requestStock={requestStock} />
      ))}
        <Styles.Sidebar id="container">
          <Dock sticky>
            <Size parentId="container">
              <Hide>
                <Slider>
                  <SliderCard level={0}>hello</SliderCard>
                  <SliderCard level={0}>bro</SliderCard>
                </Slider>
              </Hide>
            </Size>
          </Dock>
        </Styles.Sidebar>
    </Styles.Root>;
}
