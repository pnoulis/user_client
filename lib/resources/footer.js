import { copyright, createdBy, useSocials } from "./various";

const data = {
  branch: null,
  socials: null,
  logo: null,
  email: null,
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
  getRemotes: () => ["branch", "socials", "logos", "emails"],
  get: (remotes) => {
    if (!Object.values(remotes).length) return null;
    data["branch"] = remotes.branch || null;
    data["socials"] = remotes.socials || null;
    data["logo"] = (remotes.logos && remotes.logos[0]) || null;
    data["email"] = remotes.emails.info || null;
    return data;
  }
};

export {footer};
