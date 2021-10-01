import styled from "styled-components";

export
const
FlashMessages = styled.article`
font-size: var(--font-root-regular);
width: 100%;
position: sticky;
display: flex;
flex-flow: column nowrap;
justify-content: flex-end;
padding: 30px 3px 0 3px;
background-color: var(--color-background-grey);
bottom: 0;
z-index: 20;
& > *  {
margin-bottom: 10px;
}
`,
FlashMessage  = styled.div`
margin-left: auto;
margin-right: auto;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
flex: 0 1 120px;
background-color: var(--color-primary);
color: var(--color-font);
width: 100%;

&.checkout {
font-size: var(--font-size-2large);
font-weight: bold;
letter-spacing: 1px;
cursor: pointer;
text-transform: capitalize;
&:hover {
background-color: var(--color-semantic);
color: white;
}
@media (min-width: 800px){
border-radius: 10px;
}
}
&.outofstock {
background-color: var(--color-error);
color: white;
font-weight: bold;
letter-spacing: 1px;
font-size: var(--font-size-2large);
}

`;
