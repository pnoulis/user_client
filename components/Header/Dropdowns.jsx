import styled from "styled-components";
import Link from "next/link";

const
DropdownWrapper = styled.ul`
list-style-type: none;
position: absolute;
top: 33px;
left: -9px;
background-color: var(--color-secondary);
min-width: 100%;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
padding: 30px 5px 0 10px;
display: ${props => props.show ? "block" : "none"};
z-index: 1;

&:hover {
display: block;
}
`,
NavLink = styled.a`
margin-right: 15px;
display: inline-block;
cursor: pointer;
outline: none;
padding: 10px 20px 10px 35px;
font-size: var(--font-size-large);
letter-spacing: 1px;
width: 100%;
color: white;
border-left: 1px solid black;
margin-bottom: 10px;

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
export default function Dropdown({show, navs}) {
  return (
    <DropdownWrapper show={show}>
      {navs.map((nav, i) => (
        <li key={i}>
          <Link href={nav.href || ""}>
            <NavLink>{nav.name}</NavLink>
          </Link>
        </li>
      ))}
    </DropdownWrapper>
  );
}
