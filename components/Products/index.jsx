import {useEffect} from "react";
import * as Styles from "./Styles";
import {Slider, SliderCard, Hide} from "components/Slider";
import {useBackend, renderStatus} from "lib/hooks";
import {Product} from "./Product";
import {APP_STORE} from "lib/stores";

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
  }, [res]);

  return (
    <Styles.Root>
      {status && status.name === "loading" ?
       <p style={{position: "absolute", width: "100%", height: "100%", }}>{renderStatus(status)}</p>
       : products.map((pr, i) => (
         <Product key={i} id={i} product={pr} requestStock={requestStock} />
       ))
      }
      {/* {products.map((pr, i) => ( */}
      {/*   <Product key={i} id={i} product={pr} requestStock={requestStock} /> */}
      {/* ))} */}
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
