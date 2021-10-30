import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useResources } from "lib/resources";

const data = {
  facebook: {
    link: "/",
    img: "/socials/facebook-filled.svg"
  },
  instagram: {
    link: "/",
    img: "/socials/instagram-filled.svg",
  },
  google: {
    link: "",
    img: "",
  },
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

export default function Socials({orientation, size}) {
  const footer = useResources("footer");
  console.log(footer);
  return (
    <SocialsLayout vertical={orientation === "vertical" && "vertical"}
                   size={size}>
      <Facebook
        link={data.facebook.link}
        img={data.facebook.img}
      />
      <Instagram
        link={data.instagram.link}
        img={data.instagram.img}
      />
      <Google
        link={data.google.link}
        img={data.google.img}
      />
    </SocialsLayout>
  );
}
