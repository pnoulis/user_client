import { copyright, createdBy, useSocials } from "./various";

const data = {
  branch: null,
  socials: null,
  logo: null,
  copyright,
  createdBy,
  about: [
    {href: "/blog", name: "blog"},
    {href: "/contact", name: "contact"},
    {href: "/info/countriesOfOperation", name: "countries of operation"},
    {href: "/info/history", name: "history"},
    {href: "/info/missionStatement", name: "mission statement"},
  ],
  legals: [
    {href: "/legals/payment", name: "payment"},
    {href: "/legals/returnsPolicy", name: "returns policy"},
    {href: "/legals/privacyPolicy", name: "privacy policy"},
    {href: "/legals/terms&Conditions", name: "terms & conditions"},
  ],
};
const footer = {
  getRemotes: () => ["branch", "socials", "logo"],
  get: (remotes) => {
    data["branch"] = remotes.branch || null;
    data["socials"] = remotes.socials || null;
    data["logo"] = remotes.logo || null;
    return data;
  }
};

export {footer};
