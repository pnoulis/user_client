import {StandardLayout} from "components/APP";
import {backend} from "lib/utils";
import Products from "components/Products";

export default function PRODUCTS_PAGE({products, pages, current, category}) {
  return (
    <StandardLayout>
      <Products key={current} products={products} pages={pages} current={current} category={category}/>
    </StandardLayout>
  );
}

export async function getServerSideProps(context) {
  const res = await backend.get({url: `/products/${context.query.category}/${context.query.page}`});
  const payload = res.payload;

  if (payload.redirect) {
    return {
      redirect: {
        destination: payload.redirect,
        permanent: false,
      },
    };
  }

  payload.category = context.params.category;
  return {props: payload};
}
