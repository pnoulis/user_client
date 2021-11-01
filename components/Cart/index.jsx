import React, {useEffect, useState, useRef} from "react";
import {useBackend, renderStatus} from "lib/hooks";
import {APP_STORE} from "lib/stores";
import * as Styles from "./Layout";
import styled from "styled-components";
import Item from "./Item";
import Header from "./Header";

const loadingStyle = {
  outer: {
    boxSizing: "content-box",
    padding: "50px",
    backgroundColor: "black",
    borderRadius: "50%",
    boxShadow: "0 0 10px var(--color-semantic)",
  },
};

export default function Cart() {
  const { app, setApp } = APP_STORE.useAppContext();
  const { setReq, status, res } = useBackend();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setReq({ method: "get", url: "/cart" });
  }, []);

  useEffect(() => {
    const pids = Object.keys(app.cart);
    pids.shift(); // remove meta
    if (pids.length === products.length) return null;
  }, [app.cart]);
  function incrStock(pid, amount) {
    amount < 0
      ? setReq(
        {method: "delete", url: "/cart/remove", payload: { pid, amount: -amount,}}
      )
      : setReq(
        { method: "post", url: "/cart/add", payload: { pid, amount }}
      );
  }

  useEffect(() => {
    if (!res || !res.payload) return null;
    const { cart, products, pid, amount, leaseTimeout } = res.payload;
    if (cart) {
      setProducts(products);
      return setApp("mountCart", cart);
    }
    if (leaseTimeout) {
      return setApp("rmCart", pid);
    }
    if (!amount) {
      return setApp("addFlash", {flashId: "FOutOfStock"});
    }
    setApp("addCart", res.payload);
  }, [res]);

  return (products.length && app.cart.meta.amount) ? (
    <Styles.Root>
      <Styles.LoadingScreen loading={status("loading") && "true"}>{renderStatus(status("loading"), loadingStyle)}</Styles.LoadingScreen>
      <Styles.HeaderLayout>
        <Header cart={app.cart.meta}/>
      </Styles.HeaderLayout>
      <Styles.ItemsLayout>
        {products.map((product, i) => {
          return app.cart[product.pid] ? (
            <Item
              key={i}
              product={{...product, ...app.cart[product.pid]}}
              handleStockIncr={incrStock}
            />
          ) : null;
        })}
      </Styles.ItemsLayout>
    </Styles.Root>
  ) : (
    <Styles.Root>
      <Styles.EmptyCart>
        <p>Wow such emptyness!!!</p>
      </Styles.EmptyCart>
    </Styles.Root>
  );
}
