import {tabs} from "lib/utils";

function incrCart(cart, item) {
  let { pid, amount, ppu = 0, wpu = 0 } = item;
  if (!(pid && amount)) return cart;
  ppu = parseInt(ppu);
  wpu = parseInt(wpu);
  const meta = {
    price: cart.meta.price || 0, weight: cart.meta.weight || 0,
    amount: cart.meta.amount || 0
  };
  meta.price += amount < 1 ? -ppu : ppu;
  meta.weight += amount < 1 ? -wpu : wpu;
  meta.amount += amount;
  const product = cart[pid] || {amount: 0, ppu, tp: 0, wpu, tw: 0};
  product.amount += amount;
  product.tp += amount < 1 ? -1 * ppu : ppu;
  product.tw += amount < 1 ? -1 * wpu : wpu;

  const newCart = {...cart, meta};
  if (!product.amount) {
    delete newCart[pid];
  }
  return newCart;
};
function delCart(cart, pid) {
  return cart;
}
const
ACTIONS = {
  addCart: (product) => ({ scope: "public", type: "ADD", product }),
  rmCart: (pid) => ({ scope: "public", type: "REMOVE", pid }),
  mountCart: (cart) => ({ scope: "public", type: "MOUNT_CART", cart }),
},
REDUCER = (state, action) => {
  switch (action.type) {
  case "ADD":
    return incrCart(state.cart, action.product);
  case "REMOVE":
    const remove = {...state.cart[action.pid]};
    remove.amount *= -1;
    remove.pid = action.pid;
    return incrCart(state.cart, remove);
  case "MOUNT_CART":
    return action.cart;
  default:
    return state.cart;
  }
},
CART_STORE = {
  ACTIONS,
  REDUCER,
};

export {CART_STORE};
