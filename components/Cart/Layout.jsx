import styled from "styled-components";

export
const
Root = styled.article`
flex: 1;
min-width: 100%;
min-height: 100%;
display: flex;
flex-flow: column nowrap;
gap: 50px;
padding-top: 20px;
`,
HeaderLayout = styled.div`
width: 100%;
background-color: var(--color-primary);
`,
ItemsLayout = styled.div`
flex: 1;
width: 100%;
height: 100%;
gap: 50px; //row column
padding: 0 20px;
font-size: var(--font-root-regular);
display: flex;
flex-flow: row wrap;
align-items: center;
justify-content: center;
max-width: 2200px;
margin: auto;
`,
LoadingScreen = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 290;
min-width: 100vw;
min-height: 100vh;
display: ${props => props.loading ? "flex" : "none"};
justify-content: center;
align-items: center;
`,
EmptyCart = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;

> p {
box-sizing: content-box;
padding: 10px 15px;
border-radius: 5px;
text-align: center;
letter-spacing: 1px;
width: 90%;
max-width: 450px;
background-color: var(--color-secondary);
color: white;
font-weight: bold;
font-size: var(--font-size-2large);
}
`;

