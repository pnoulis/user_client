import styled from "styled-components";
import Router from "next/router";
import {APP_STORE} from "lib/stores";


const
HeaderWrapper = styled.div`
margin: auto;
width: 350px;
background-color: var(--color-primary);
padding: 15px 5px 2px 5px;
display: flex;
flex-flow: row wrap;
justify-content: flex-end;
align-items: center;
font-size: var(--font-root-regular);
gap: 5px 15px;

@media (min-width: 800px) {
padding-right: 15px;
padding-bottom: 5px;
margin: 0;
margin-left: auto;
width: 700px;
}
`,
CheckoutButton = styled.a`
display: inline-block;
width: max-content;
padding: 5px 7px;
outline: none;
border: none;
font-weight: bold;
border-radius: 5px;
background-color: var(--color-secondary);
color: white;
font-size: var(--font-size-regular);
text-transform: capitalize;

&:hover {
background-color: var(--color-honey);
}

@media (min-width: 800px) {
padding: 10px 19px;
font-size: var(--font-size-large);
}
`,
CartWrapper = styled.div`
flex: 1;
display: flex;
flex-flow: row wrap;
justify-content: center;
gap: 0 15px;

`,
TermsWrapper = styled.div`
@media (min-width: 800px) {
margin-top: 20px;
flex: 1 0 100%;
}

`,
Text = styled.div`
font-size: var(--font-size-small);
color: var(--color-font);
text-transform: lowercase;
letter-spacing: -1px;
display: flex;
flex-flow: row nowrap;

@media (min-width: 800px) {
font-size: var(--font-size-regular);
letter-spacing: 0px;
}
`,
Star = styled.strong`
font-size: var(--font-size-large);
color: var(--color-semantic);
margin-right: 3px;
height: 100%;
`,
CartProperty = styled.p`
flex: 1;
display: flex;
flex-flow: column nowrap;
justify-content: center;
font-size: var(--font-size-regular);

@media (min-width: 800px) {
font-size: var(--font-size-large);
}
`,
CartKey = styled.span`
color: var(--color-font);
font-weight: bold;
`,
CartValue = styled.span`
letter-spacing: 1px;
`;


function Terms() {
  return (
    <TermsWrapper>
      <Text>
        <Star>*</Star>
        before delivery charge
      </Text>
      <Text><Star>*</Star>
        carts above 50kg or within 50 miles
        radius of our distribution centers are exempt
      </Text>
    </TermsWrapper>
  );
}

function Cart({cart}) {
  return (
    <CartWrapper>
      <CartProperty>
        <CartKey>amount:</CartKey>
        <CartValue>{cart.amount}</CartValue>
      </CartProperty>
      <CartProperty>
        <CartKey>price:</CartKey>
        <CartValue>&#163;{cart.price}</CartValue>
      </CartProperty>
      <CartProperty>
        <CartKey>weight:</CartKey>
        <CartValue>{cart.weight}kg</CartValue>
      </CartProperty>
    </CartWrapper>
  );
}

function Checkout() {
  const { app } = APP_STORE.useAppContext();
  function checkout() {
    console.log("will cehckout");
    console.log(app);
    Router.push("/checkout/login");
  }
  return (
    <CheckoutButton onClick={checkout}>checkout</CheckoutButton>
  );
}
export default function Header({cart}) {
  return (
    <HeaderWrapper>
      <Cart cart={cart}/>
      <Checkout/>
      <Terms/>
    </HeaderWrapper>
  );
}
