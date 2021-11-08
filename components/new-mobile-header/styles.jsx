import styled from "styled-components";

export
const
Header = styled.header`
background-color: var(--color-secondary);
min-height: 100vh;
padding: 20px 10px 5px 10px;
display: grid;
grid-template-columns: 1fr min-content min-content;
grid-template-rows: auto 1fr auto auto;
gap: 10px 0;
`,
LogoWrapper = styled.a`
grid-column: 1/2;
grid-row: 1/2;
// content-size
box-sizing: content-box;
padding: ${props => props.reduce ? "0 15px 2px 0" : "0 15px"};
display: flex;
// align-items: center;
width: 60px;
img {
display: inline-block;
width: ${props => props.reduce ? "40px" : "55px"};
}

// actions
cursor: pointer;

@media (min-width: 600px) {
padding: 5px 20px;
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
grid-column: 2/3;
grid-row: 1/2;
// align-self: end;
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
align-self: center;
margin-right: 25px;
}

`,
ToggleWrapper = styled.a`
grid-column: 3/4;
grid-row: 1/2;

// align-self: end;
position: relative;

margin-left: auto;
margin-right: 22px;
box-sizing: content-box;
padding: 5px 13px 5px 13px;
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

background-color: white;
cursor: pointer;

@media (min-width: 600px) {
width: 37px;
height: 37px;
margin-right: 35px;
}

@media (min-width: 1100px) {
margin-bottom: 0;
align-self: center;
margin-right: 25px;
}



`,
SocialsWrapper = styled.div`
grid-column: 1/4;
grid-row: 4/5;
width: 148px;
margin: auto;
`;
