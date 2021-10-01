import {StandardLayout} from "components/App";
import backend from "lib/backend";
import Products from "components/Products";

export default function PRODUCTS_PAGE({products, pages}) {
  return (
    <StandardLayout>
      <Products products={products} pages={pages}/>
    </StandardLayout>
  );
}

export async function getServerSideProps(context) {
  const res = await backend.get({url: `/products/${context.params.category}`});
  const payload = res.payload;

  if (payload.redirect) {
    return {
      redirect: {
        destination: payload.redirect,
        permanent: false,
      },
    };
  }
  return {props: payload};
}
