const BACKEND_HOST = `http://${process.env.NEXT_PUBLIC_DOMAIN || "localhost"}:${process.env.NEXT_PUBLIC_BACKEND_PORT || 8080}/api`;
const urls = {
  emails: BACKEND_HOST + "/data/emails",
  phones: BACKEND_HOST + "/data/mobiles",
  HQ: BACKEND_HOST + "/data/HQ",
  branch: BACKEND_HOST + "/data/branch",
  socials: BACKEND_HOST + "/data/socials",
  logos: BACKEND_HOST + "/data/logos",
  login: BACKEND_HOST + "/login",
  register: BACKEND_HOST + "/register",
  session: BACKEND_HOST + "/session",
  addCart: BACKEND_HOST + "/card/add",
  rmCart: BACKEND_HOST + "/cart/remove",
  products: (tags, page) => BACKEND_HOST + `/products/${tags}/${page}`,
};
const urlNoBackend = {
  emails: "/data/emails",
  phones: "/data/mobiles",
  HQ: "/data/HQ",
  branch: "/data/branch",
  socials: "/data/socials",
  logos: "/data/logos",
  login: "/login",
  register: "/register",
  session: "/session",
  addCart: "/card/add",
  rmCart: "/cart/remove",
  products: (tags, page) => `/products/${tags}/${page}`,
};

const getUrls = (...urls) => {
  return urls.map(url => urlNoBackend[url]);
};

export default getUrls;
