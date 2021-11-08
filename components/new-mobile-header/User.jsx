import styled from "styled-components";
import Link from "next/link";
import {useState} from "react";
import {APP_STORE} from "lib/stores";
import {useBackend} from "lib/hooks";

const { useAppContext } = APP_STORE;
const
AccountWrapper = styled.ul`
grid-column: 1/4;
grid-row: 3/4;
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
display: ${props => props.show ? "block" : "none"};
padding-top: 15px;
li {
margin-bottom: 15px;
}
`,
NavLink = styled.a`
display: block;
width: 100%;
padding: 10px 0 10px 0;
cursor: pointer;
background-color: var(--color-primary);
letter-spacing: 1.5px;
font-size: var(--font-size-large);
text-align: center;
border-radius: 5px;
color: black;


&:hover {
color: var(--color-font);
background-color: var(--color-honey);
border-left-color: white;
border-radius: 5px;
font-weight: bold;
}

`,
LoginWrapper = styled.div`
grid-column: 1/4;
grid-row: 3/4;
align-self: center;

display: flex;
flex-flow: row nowrap;
justify-content: center;

a:not(:last-child) {
margin-right: 40px;
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
  const [touched, setTouched] = useState(false);

  function handleTouch(e) {
    e.preventDefault();
    setTouched(!touched);
  }

  return (
    <AccountWrapper>
      <UserAccount onClick={handleTouch}>
        <span>user</span>
        <img src="/user_success.png" alt="user-icon"/>
      </UserAccount>
      <Dropdown show={touched} navs={userNav}/>
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
  const {app, setApp} = useAppContext();
  const {setReq, status, res} = useBackend();

  function logout() {
    setReq({method: "delete", url: "/logout"});
    setApp("logout");
  }
  return (
    <DropdownWrapper show={show}>
      <li>
        <Link href={"/account"}>
          <NavLink>account</NavLink>
        </Link>
      </li>
      <li onClick={() => setApp("logout")}>
        <NavLink>logout</NavLink>
      </li>
    </DropdownWrapper>
  );
}
