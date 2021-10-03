import {useState} from "react";
import styled from "styled-components";

const S = {};
S.Toggle = styled.div`
position: relative;
height: 100%;
width: ${props => props.toggled ? "0px" : "303px"};
max-height: 1200px;
transition: transform 2s, width 2s;
z-index: 200;

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
padding: 5px;
width: 15px;
height: 15px;
border-radius: 50%;
cursor: pointer;
background-color: var(--color-secondary);
position: absolute;
top: 50%;
right: -18px;
// right: ${props => props.toggled ? "-18px" : "-18px"};
transform: ${props => props.toggled ? "rotate(0) translate(0, -50%)" : "rotate(-180deg) translate(0, 50%)"};
transition: transform 2s, right 2s;
img {
position: absolute;
transform: transition(-50%, -50%);
display: inline-block;
width: 15px;
height: 15px;
}

@media (min-width: 400px) {
padding: 10px;
width: 20px;
height: 20px;
right: -35px;

img {
width: 20px;
height: 20px;
}
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
