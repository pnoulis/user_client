import styled from "styled-components";
import {Dimensions} from "lib/utils";

export
const
Header = styled.header`
// position
position: ${props => props.position};
position: sticky;
top: 0;
z-index: 300;

// content - size
display: grid;
grid-template-columns: 1fr 1fr min-content;
grid-template-rows: ${props => props.reduce ? "1fr" : "1fr 1fr"};
padding: 0px 15px 0 15px;
// fonts
font-size: var(--font-root-regular);
// color
background-color: var(--color-secondary);

// desktop header
@media (min-width: 1100px) {
grid-template-columns: 1fr 3fr min-content min-content;
padding: 5px 15px 5px 0;
grid-gap: 10px 0; // row column
}
`,
LogoWrapper = styled.a`
// layout - position
grid-column: 1/2;
grid-row: ${props => props.reduce ? "1/2" : "1/3"};
align-self: center;

// content-size
box-sizing: content-box;
padding: ${props => props.reduce ? "1px 15px 2px 0" : "5px 15px"};
display: flex;
align-items: center;
width: 60px;
img {
display: inline-block;
width: ${props => props.reduce ? "40px" : "55px"};
}

// actions
cursor: pointer;

@media (min-width: 600px) {
margin-left: 5%;
padding: 5px 30px;
width: 80px;

img {
width: ${props => props.reduce ? "55px" : "80px"};
}
}

@media (min-width: 800px) {
width: 120px;
img {
width: ${props => props.reduce ? "55px" : "90px"};
}
}

@media (min-width: 1100px) {
justify-content: center;
margin: 0;
width: 150px;
& > img {
width: 100px;
}
}

@media (min-width: 1400px) {
& > img {
width: 110px;
}
}
`,
CartWrapper = styled.a`
// layout - position
grid-colmn: 2/3;
grid-row: ${props => props.reduce ? "1/2" : "2/3"};
align-self: end;
position: relative;

margin-left: auto;
margin-right: 22px;
box-sizing: content-box;
padding: 5px 15px 5px 10px;
margin-bottom: 3px;
width: 25px;
height: 25px;
border-radius: 5px;
z-index: 20;

img {
display: inline-block;
width: 100%;
height: 100%;
}

cursor: pointer;

background-color: ${props => props.cart ? "white" : "initial"};

&:hover {
background-color: white;
}

span {
display: ${props => props.cart ? "block" : "none"};
position: absolute;
box-sizing: content-box;
padding: 10px;
width: ${props => {
return props.cart >= 100 ? "18px" :
props.cart >= 10 ? "15px" : "10px";
}};
height: ${props => {
return props.cart >= 100 ? "18px" :
props.cart >= 10 ? "15px" : "10px";
}};
top: ${props => props.reduce ? "-2px" : "-15px"};
left: ${props => {
return props.cart >= 100 ? "-30px" :
props.cart >= 10 ? "-28px" : "-23px";
}};
background-color: red;
color: white;
font-size: var(--font-size-regular);
font-weight: bold;
z-index: 10;
outline: none;
border-radius: 50%;
border: none;

& > .cartHolder {
width: min-content;
height: min-content;
margin: 0;
padding: 0;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}
}
@media (min-width: 600px) {
width: 37px;
height: 37px;
margin-right: 35px;
}

@media (min-width: 1100px) {
margin-bottom: 0;
grid-column: 3/4;
grid-row: 2/3;
align-self: center;
margin-right: 25px;
}
`,
ToggleWrapper = styled.a`
// layout - position
grid-column: 3/4;
grid-row: ${props => props.reduce ? "1/2" : "2/3"};
align-self: end;


// content - size
margin-left: auto;
box-sizing: content-box;
padding: ${props => props.reduce ? "10px 10px 10px 15px" : "10px 1px 10px 15px"};
width: 25px;
height: 21px;
border-radius: 5px;
display: flex;
flex-flow: column nowrap;
justify-content: space-between;

span {
display: inline-block;
width: 100%;
height: 3px;
border-radius: 3px;
background-color: black;
}

// actions
cursor: pointer;

@media (min-width: 600px) {
width: 40px;
height: 30px;
}

@media (min-width: 1100px) {
display: none;
}
`,
SocialsWrapper = styled.div`
// layout - position
display: ${props => props.reduce ? "none" : "flex"};
grid-column: 2/4;
grid-row: 1/2;
align-self: center;
margin-left: auto;

flex-flow: row nowrap;
a:not(:last-child) {
margin-right: 10px;
}

a {
box-sizing: content-box;
display: inline-block;
width: 25px;
height: 25px;
margin: 0;
cursor: pointer;
}

img {
display: inline-block;
width: 100%;
height: 100%;
}

@media (min-width: 600px) {
a {
width: 40px;
height: 40px;
}
}

@media (min-width: 1100px) {
grid-column: 3/5;
align-self: center;
}
`;
