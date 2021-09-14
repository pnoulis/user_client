import {useEffect} from "react";
import * as Styles from "./Styles";
import {Slider, SliderCard, Hide} from "components/Slider";
import {useBackend} from "lib/hooks";
import {Product} from "./Product";
import {APP_STORE} from "lib/stores";

export default function Products({products}) {
  const {setReq, status, res} = useBackend(),
        {shoppingCart, setApp} = APP_STORE.useAppContext();

  function requestStock(id) {
    if (status) return;
    setReq({method: "post", url: "/cart-add", payload: {
      request: {amount: 1, pid: products[id].pid},
      cart: shoppingCart.token,
    }});
  }

  useEffect(() => {
    if (!res) return null;
    console.log(res);
    const payload = res.payload;
    // if (payload.flashMessage) setApp("addFlash", {flashId: payload.flashMessage});
    if (res.ok) {
      setApp("addCart", products.find(pr => pr.pid === payload.pid), payload.token);
    }
  }, [res]);

  useEffect(() => {
    console.log("shopping cart changed");
    console.log(shoppingCart);
  }, [shoppingCart]);
  return (
    <Styles.Root>
      {products.map((pr, i) => (
        <Product key={i} id={i} product={pr} requestStock={requestStock} />
      ))}
      <Styles.Sidebar>
        <Hide>
          <Slider type="vertical">
            <SliderCard level={0}>hello</SliderCard>
            <SliderCard level={0}>braaah</SliderCard>
          </Slider>
        </Hide>
      </Styles.Sidebar>
    </Styles.Root>
  );
}
