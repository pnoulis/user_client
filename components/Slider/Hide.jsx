import {useState} from "react";
import styled from "styled-components";

const S = {};
S.Toggle = styled.div`
position: relative;
height: 100%;
width: ${props => props.toggled ? "0px" : "350px"};
transition: transform 2s, width 2s;

& * {
color: ${props => props.toggled ? "transparent !important;" : "initial"};
transition: transform 1s, color 1s ease-in;
}

@media (min-width: 600px) {
width: ${props => props.toggled ? "0px" : "350px"};
}

`,
S.togglingAction = styled.div`
box-sizing: content-box;
padding: 10px;
width: 30px;
height: 30px;
border-radius: 50%;
cursor: pointer;
background-color: var(--color-secondary);
position: absolute;
top: 50%;
right: ${props => props.toggled ? "-40px" : "-50px"};
transform: ${props => props.toggled ? "rotate(0) translate(0, -50%)" : "rotate(-180deg) translate(0, 50%)"};
transition: transform 2s, right 2s;
img {
display: inline-block;
width: 100%;
height: 100%;
}
`;

export function Hide({children}) {
  const
  [toggle, setToggle] = useState(true);

  function handleToggle(e) {
    setToggle(!toggle);
  }

  return (
    <S.Toggle toggled={toggle}>
      {children}
      <S.togglingAction toggled={toggle} onClick={handleToggle}>
        <img src="/right-arrow-angle.png" alt="right-arrow"/>
      </S.togglingAction>
    </S.Toggle>
  );
}
