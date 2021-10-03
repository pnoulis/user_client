import {useState, useEffect} from "react";
import Link from "next/link";
import styled from "styled-components";

const
AccountWrapper = styled.ul`
grid-column: 4/5;
grid-row: 2/3;
align-self: center;
position: relative;
list-style-type: none;

`,
UserAccount = styled.li`
border: none;
outline: none;
display: flex;
flex-flow: row nowrap;
padding: 8px 15px 8px 20px;
background-color: var(--color-honey);
justify-content: center;
border-radius: 5px;
align-items: center;
cursor: pointer;
color: black;
position: relative;
z-index: 100;
min-width: 156px;
font-size: var(--font-size-large);
text-transform: capitalize;

&:hover > ul {
display: block !important;
}

&:hover {
background-color: var(--color-primary);
color: var(--color-font);
border-bottom-left-radius: 0;
border-bottom-right-radius: 0;

}

span {
display: inline-block;
margin-right: 15px;
letter-spacing: 0.5px;
font-weight: bold;

}
img {
display: inline-block;
width: 30px;
height: 30px;
}

@media (min-width: 1800px) {
font-size: var(--font-size-2large);
}
`,
DropdownWrapper = styled.ul`
list-style-type: none;
position: absolute;
top: 45px;
left: 50%;
transform: translate(-50%, 0);
background-color: var(--color-primary);
min-width: 100%;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
padding: 15px 5px 0 10px;
display: none;
z-index: 1;

&:hover {
display: block;
}
`,
NavLink = styled.a`
text-transform: lowercase;
margin-right: 15px;
display: inline-block;
cursor: pointer;
outline: none;
padding: 10px 20px 10px 20px;
font-size: var(--font-size-regular);
font-weight: bold;
letter-spacing: 1px;
width: 100%;
color: var(--color-font);
margin-bottom: 10px;

&:hover {
color: var(--color-font);
background-color: var(--color-honey);
border-radius: 5px;
}

&:active {
color: var(--color-font);
background-color: var(--color-primary);
}
`,
LoginWrapper = styled.div`
@media (max-width: 1100px) {
display: none;
}
grid-column: 4/5;
grid-row: 2/3;
align-self: center;

display: flex;
flex-flow: row nowrap;
justify-content: flex-end;

a:not(:last-child) {
margin-right: 15px;
}

a {
display: inline-block;
width: 100px;
padding: 10px 0;
text-align: center;
background-color: var(--color-honey);
border-radius: 5px;
border: none;
outline: none;
font-size: var(--font-size-regular);
font-weight: bold;
color: white;
letter-spacing: 1px;
text-transform: capitalize;
&:hover {
background-color: var(--color-primary);
color: var(--color-font);
}

}


@media (min-width: 1400px) {
a {
width: 120px;
font-size: var(--font-size-large);
}
}

@media (min-width: 1800px) {
a {
font-size: var(--font-size-2large);
}
}
`;


export function Account({userNav}) {
  const [mobileTouched, setMobileTouched] = useState(false);
  return (
    <AccountWrapper>
      <UserAccount onTouchStart={() => setMobileTouched(!mobileTouched)}>
        <span>user</span>
        <img src="/user_success.png" alt="user-icon"/>
        <Dropdown show={mobileTouched} navs={userNav}/>
      </UserAccount>
    </AccountWrapper>
  );
}

export function Login() {
  return (
    <LoginWrapper>
      <Link href="/login">
        <a>login</a>
      </Link>
      <Link href="/register">
        <a>register</a>
      </Link>
    </LoginWrapper>
  );
}

function Dropdown({show, navs}) {
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

