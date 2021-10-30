const data = {
  socials: null,
  logo: null,
  nav: [
    {href: "/", name: "home"},
    {href: "/company", name: "company"},
    {href: "/something", name: "something"},
    {href: "/shop", name: "shop", secondary: [
      {href: "/products/meat/1", name: "meat"},
      {href: "/products/fish/1", name: "fish"},
      {href: "/products/vegetables/1", name: "vegetables"},
    ]},
  ],
  user: [
    {href: "/account", name: "account"},
    {href: "/logout", name: "logout"},
  ],
};

const header = {
  getRemotes: () => ["socials", "logo"],
  get: (remotes) => {
    data["socials"] = remotes.socials || null;
    data["logo"] = remotes.logo || null;
    return data;
  }
}
export {header};
