import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";


const
Root = styled.div`
background-color: white;
box-sizing: border-box;
width: 100%;
max-width: 400px;
margin: auto;
border-radius: 8px;

@media (min-width: 800px) {
max-width: 500px;
}
@media (min-width: 1000px) {
display: grid;
grid-template-areas: "deleteItem itemTitle increment" "itemImage itemContent increment";
grid-template-columns: minmax(50px, auto) 2fr 70px;
grid-template-rows: minmax(70px, auto) minmax(300px, auto);
margin: auto;
width: 100%;
max-width: 950px;
}
`,
IncrementsWrapper = styled.div`
grid-area: increment;
display: flex;
flex-flow: row nowrap;
border-top: 2px solid var(--color-honey);

@media (min-width: 1000px) {
grid-area: increment;
flex-flow: column nowrap;
border-top: none;
border-left: 2px solid var(--color-honey);
}

`,
Increment = styled.div`
padding: 20px 15px 10px 15px;
margin: 0;
flex: 1 1 auto;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border-bottom-left-radius: ${props => props.add && "8px"};
border-bottom-right-radius: ${props => !props.add && "8px"};
img {
display: inline-block;
width: 25px;
height: 25px;
transform: ${props => props.add ? "rotate(-90deg)" : "rotate(90deg)"};
}

&:hover {
background-color: var(--color-honey);
}

@media (min-width: 800px) {
padding: 20px 15px 20px 15px;
}

@media (min-width: 1000px) {
border-top-right-radius: ${props => props.add && "8px"};
border-bottom-left-radius: 0;
}
`,
Title = styled.div`
padding: 10px 5px;
font-size: var(--font-size-large);
font-weight: bold;
display: flex;
justify-content: center;
align-items: center;
letter-spacing: 0.5px;
text-align: center;
margin-bottom: 20px;
color: var(--color-font);
text-transform: capitalize;

@media (min-width: 1000px) {
grid-area: itemTitle;
margin-bottom: 0;
align-items: flex-end;
}
`,
ContentWrapper = styled.div`
display: flex;
flex-flow: column nowrap;
width: 100%;
max-width: 250px;
margin: auto;
padding: 5px 10px 20px 10px;
font-size: var(--font-size-large);
color: var(--color-font);
gap: 15px;

@media (min-width: 800px) {
max-width: 300px;
}

@media (min-width: 1000px) {
grid-area: itemContent;
padding: 30px 0;
margin: auto auto 10px auto;
width: 100%;
height: 100%;
max-width: 80%;
justify-content: center;
}
`,
ContentTerm = styled.div`
flex: 1 1 max-content;
max-height: 40px;
display: flex;
flex-flow: row nowrap;
position: relative;
& > .term {
margin-right: auto;
sub {
position: absolute;
font-size: var(--font-size-2small);
font-weight: bold;
}
}
& > .description {

sub {
position: absolute;
bottom: 0;
font-size: var(--font-size-2small);
font-weight: bold;
}

@media (min-width: 1000px) {
sub {
bottom: 10px;
}
}
}

`,
Delete = styled.div`
margin-right: 10px;
margin-top: 10px;
margin-bottom: 10px;
box-sizing: content-box;
padding: 15px;
width: 20px;
height: 20px;
border-radius: 50%;
background-color: var(--color-secondary);
cursor: pointer;
margin-left: auto;
img {
display: inline-block;
width: 100%;
height: 100%;
}

@media (min-width: 1000px) {
grid-area: deleteItem;
margin-right: auto;
margin-left: 10px;
margin-top: 10px;
margin-bottom: initial;
}
`,
ItemImage = styled.div`
width: 200px;
margin: auto;
img {
display: inline-black;
width: 100%;
height: 100%;
}

@media (min-width: 800px) {
width: 320px;
}

@media (min-width: 1000px) {
grid-area: itemImage;
padding-bottom: 10px;
padding-left: 10px;
}
`;


export function Item() {
  return (
    <Root>
      <Delete>
        <img src="/close-black-filled-64px.png" alt="close-icon"/>
      </Delete>
      <ItemImage>
        <img src="/user_success.png" alt="product-image"/>
      </ItemImage>
      <Title>canned fish</Title>
      <ContentWrapper>
        <ContentTerm>
          <span className="term">amount</span>
          <span className="description">5</span>
        </ContentTerm>
        <ContentTerm>
          <span className="term">weight<sub>1</sub></span>
          <span className="description">500<sub>gr</sub></span>
        </ContentTerm>
        <ContentTerm>
          <span className="term">price<sub>1</sub></span>
          <span className="description">&#163;100</span>
        </ContentTerm>
        <ContentTerm>
          <span className="term">total</span>
          <span className="description">&#163;500</span>
          <span className="description">&nbsp;&nbsp;500<sub>gr</sub></span>
        </ContentTerm>

      </ContentWrapper>
      <IncrementsWrapper>
        <Increment add>
          <img src="/right-arrow-angle.png" alt="right-arrow"/>
        </Increment>
        <Increment>
          <img src="/right-arrow-angle.png" alt="right-arrow"/>
        </Increment>
      </IncrementsWrapper>
    </Root>
  );
}
