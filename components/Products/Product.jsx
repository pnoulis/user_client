import styled from "styled-components";

const
Root = styled.article`
// layout - dimensions
width: 100%;
height: 100%;
display: flex;
flex-flow: column nowrap;

// fonts
font-size: var(--font-root-regular);

// style
border-radius: 5px;
background-color: white;
gap: 10px 0;

// actions
&:hover {
box-shadow: 0px 0px 0.5px 3px var(--color-honey);
}

`,
ImageArea = styled.div`
// layout - dimensions
flex: 1;
display: flex;

// children
img {
display: inline-block;
width: 100%;
height: 100%;
}
`,
ContentArea = styled.div`
// layout -dimensions
flex: 1;
display: grid;
grid-template-areas: "part1 part1" "part2 part2";
grid-template-columns: 4fr 1fr;
grid-template-rows: auto min-content;
padding: 10px 20px 0 20px;
// padding: 0 8px; // same as ImageArea

// style
gap: 20px 15px;

`,
BuyArea = styled.p`
// layout - dimensions
flex: 0 50px;
display: flex;
justify-content: center;
align-items: center;

// fonts
font-size: var(--font-size-large);
font-weight: bold;
letter-spacing: 1px;
color: var(--color-font);

// styling
border-top: 2px solid var(--color-honey);

// actions
cursor: pointer;

&:hover {
background-color: var(--color-honey);
color: white;
font-size: var(--font-size-3large);
}

&:active {
opacity: 0.7;
}

@media (min-width: 800px) {
flex: 0 70px;
}
`,
Price = styled.p`
// fonts
font-size: var(--font-size-2large);
font-weight: bold;
letter-spacing: 0.5px;
text-align: right;
color: var(--color-font);

`,
Weight = styled.p`
// fonts
font-size: var(--font-size-regular);
letter-spacing: 1px;
font-weight: bold;
color: var(--color-font);
`,
Description = styled.p`
// fonts
display: inline;
overflow-wrap: anywhere;
font-size: var(--font-size-large);
color: var(--color-font);
letter-spacing: 0.5px;
text-transform: lowercase;
`;


export function Product({id, product, requestStock}) {
  return (
    <Root>
      <ImageArea>
        <img src={product.img} alt="product-image"/>
      </ImageArea>
      <ContentArea>
        <Description>{product.description}</Description>
        <Price>&#163;{product.ppu}</Price>
        <Weight>{product.wpu}{product.mu}</Weight>
      </ContentArea>
      <BuyArea onClick={() => requestStock(id)}>add to list</BuyArea>
    </Root>
  );
}
