const BACKEND_HOST = "http://localhost:4006/api";
const urls = {
  emails: BACKEND_HOST + "/data/emails",
  phones: BACKEND_HOST + "/data/mobiles",
  HQ: BACKEND_HOST + "/data/HQ",
  branch: BACKEND_HOST + "/data/branch",
  socials: BACKEND_HOST + "/data/socials",
  logo: BACKEND_HOST + "/data/logo",
  login: BACKEND_HOST + "/login",
  register: BACKEND_HOST + "/register",
  session: BACKEND_HOST + "/session",
  addCart: BACKEND_HOST + "/card-add",
  rmCart: BACKEND_HOST + "/cart-remove",
  products: (tags, page) => BACKEND_HOST + `/products/${tags}/${page}`,
};
const urlNoBackend = {
  emails: "/data/emails",
  phones: "/data/mobiles",
  HQ: "/data/HQ",
  branch: "/data/branch",
  socials: "/data/socials",
  logo: "/data/logo",
  login: "/login",
  register: "/register",
  session: "/session",
  addCart: "/card-add",
  rmCart: "/cart-remove",
  products: (tags, page) => `/products/${tags}/${page}`,
};

const getUrls = (...urls) => {
  return urls.map(url => urlNoBackend[url]);
};

export default getUrls;
