import styled from "styled-components";
import Link from "next/link";

const
DropdownWrapper = styled.ul`
list-style-type: none;
display: ${props => props.show ? "block" : "none"};
margin-left: 20px;
padding-top: 30px;

li {
margin-bottom: 15px;
}
`,
NavLink = styled.a`
display: block;
width: 100%;
color: white;
padding: 10px 0 10px 15px;
cursor: pointer;
border-left: 2px solid black;
letter-spacing: 1.5px;
font-size: var(--font-size-large);

&:hover {
color: var(--color-font);
background-color: white;
border-left-color: white;
border-radius: 5px;
font-weight: bold;
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
