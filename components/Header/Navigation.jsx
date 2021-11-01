import {useState, useEffect} from "react";
import Link from "next/link";
import styled from "styled-components";
import Dropdown from "./Dropdowns";

const
NavWrapper = styled.ul`
@media (max-width: 1100px) {
display: none;
}

grid-column: 2/3;
grid-row: 2/3;
align-self: center;
list-style-type: none;
display: flex;
flex-flow: row nowrap;
justify-content: flex-end;
padding-right: 5%;
`,
NavItem = styled.li`
position: relative;
`,
NavLink = styled.a`
margin-right: 15px;
display: inline-block;
cursor: pointer;
outline: none;
border-left: 1px solid black;
padding: 10px 20px 10px 35px;
font-size: var(--font-size-large);
letter-spacing: 1px;
width: 100%;
color: white;
position: relative;
z-index: 100;

&:hover ~ ul {
display: block;
}

&:hover {
background-color: white;
color: var(--color-font);
border-left-color: white;
border-radius: 5px;
}

&:active {
background-color: var(--color-honey);
border-left-color: var(--color-honey);
font-weight: bold;
color: black;
border-radius: 5px;
}

@media (min-width: 1800px) {
font-size: var(--font-size-2large);
}
`;

export default function Navigation({primNav}) {
  const [mobileTouched, setMobileTouched] = useState(false);
  return (
    <NavWrapper>
      {primNav.map((nav, i) => {
        if (!nav.secondary) {
          return (
            <NavItem key={i}>
              <Link href={nav.href}>
                <NavLink>{nav.name}</NavLink>
              </Link>
            </NavItem>
          );
        }
        return (
          <NavItem key={i}>
            <NavLink onTouchStart={() => setMobileTouched(!mobileTouched)}>
              {nav.name}
            </NavLink>
            <Dropdown show={mobileTouched} navs={nav.secondary}/>
          </NavItem>
        );
      })}
    </NavWrapper>
  );
}
