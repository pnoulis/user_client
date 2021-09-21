import styled from "styled-components";

export
const
FlashMessages = styled.article`
font-size: var(--font-root-regular);
width: 100%;
position: fixed;
bottom: 0;
z-index: 100;
&:nth-child(1n + 2) {
margin-top: 10px;
}
`,
FlashMessage  = styled.div`
margin: auto;
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
height: 120px;
background-color: var(--color-primary);
color: var(--color-font);
max-width: ${props => props.mWidth || "100%"};
width: 100%;
border-top-left-radius: 10px;
border-top-right-radius: 10px;

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
}
`;
