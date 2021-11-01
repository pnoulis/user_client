import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useResources } from "lib/resources";

const icons = {
  facebook: [
    "/socials/facebook-filled.svg",
  ],
  instagram: [
    "/socials/instagram-filled.svg",
  ],
  google: [],
};
const SocialsLayout = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: ${props => props.vertical ? "column nowrap" : "row nowrap"};
a {
flex: 1;
display: flex;
justify-content: center;
align-items: center;
img {
width: ${props => props.size || "20"}px;
}
}
`;
function Facebook({link, img}) {
  if (!(link && img)) return null;

  // nextjs
  if (typeof Link !== "undefined") {
    return (
      <Link href={link}>
        <a>
          <img src={img} alt="facebook-logo"/>
        </a>
      </Link>
    );
  }

  return (
    <a href={link}>
      <img src={img} alt="facebook-logo"/>
    </a>
  );
}
function Google({link, img}) {
  if (!(link && img)) return null;

  // nextjs
  if (typeof Link !== "undefined") {
    return (
      <Link href={link}>
        <a>
          <img src={img} alt="google-logo"/>
        </a>
      </Link>
    );
  }

  return (
    <a href={link}>
      <img src={img} alt="google-logo"/>
    </a>
  );
}
function Instagram({link, img}) {
  if (!(link && img)) return null;

  // nextjs
  if (typeof Link !== "undefined") {
    return (
      <Link href={link}>
        <a>
          <img src={img} alt="instagram-logo"/>
        </a>
      </Link>
    );
  }

  return (
    <a href={link}>
      <img src={img} alt="instagram-logo"/>
    </a>
  );
}

const
Pages_v1 = ({orientation, size}) => {
  const { socials } = useResources("socials");
  return !socials ? null : (
    <SocialsLayout vertical={orientation}
                   size={size}>
      <Facebook
        link={socials.facebook.page}
        img={icons.facebook[0]}
      />
      <Instagram
        link={socials.instagram.page}
        img={icons.instagram[0]}
      />
      <Google
        link={socials.google.page}
        img={icons.google[0]}
      />
    </SocialsLayout>
  );
};

const
socials = {
  auth: {
  },
  pages: [
    Pages_v1,
  ]
};

export default function getSocials(type, version) {
  try {
    --version;
    return socials[type][version];
  } catch (err) {
    throw Error("no such type or version");
  }
}
