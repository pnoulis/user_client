import {useTouchStart} from "lib/hooks";
import {useState} from "react";
import Link from "next/link";
import styled from "styled-components";
import Dropdown from "./Dropdowns";

const
NavWrapper = styled.ul`
grid-column: 1/4;
grid-row: 2/3;
// align-self: flex-end;
list-style-type: none;
padding-left: 20px;
padding-top: 20px;
@media (min-height: 500px) {
padding-top: 100px;
}
`,
NavItem = styled.li`
margin-bottom: 30px;
`,
NavLink = styled.a`
display: block;
width: 100%;
padding: 10px 0 10px 15px;
cursor: pointer;
// background-color: white;
border-left: 2px solid black;
letter-spacing: 1.5px;
font-size: var(--font-size-large);
color: white;

&:hover {
color: var(--color-font);
background-color: white;
border-left-color: white;
border-radius: 5px;
font-weight: bold;
}
`;

export default function Navigation({primNav}) {
  const [touched, setTouched] = useState(new Array(primNav.length).fill(false));

  function handleTouch(e, i) {
    e.preventDefault();
    const copy = [...touched];
    copy[i] = !copy[i];
    setTouched(copy);
  }
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
            <NavLink onClick={e => handleTouch(e, i)}>
              {nav.name}
            </NavLink>
            <Dropdown show={touched[i]} navs={nav.secondary}/>
          </NavItem>
        );
      })}
    </NavWrapper>
  );
}
