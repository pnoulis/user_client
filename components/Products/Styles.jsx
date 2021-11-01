import styled from "styled-components";


export
const
Root = styled.article`
flex: 1;
position: relative;
display: grid;
grid-template-columns: minmax(280px, 380px);
grid-auto-rows: max-content;
min-width: 100%;
min-height: 100%;
gap: 50px 50px; // row column
padding: 50px 20px 100px 20px;
font-size: var(--font-root-regular);
justify-content: center;

@media (min-width: 700px) {
grid-template-columns: repeat(2, minmax(280px, 380px));
}

@media (min-width: 1200px) {
grid-template-columns: repeat(3, minmax(280px, 380px));
}

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
Pages = styled.div`
background-color: green;
width: 200px;
height: 50px;
position: absolute;
bottom: 0;
`;
