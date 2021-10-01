import styled from "styled-components";


export
const
Root = styled.article`
position: relative;
display: grid;
grid-template-columns: minmax(280px, 380px);
grid-auto-rows: max-content;
min-width: 100%;
min-height: 100%;
gap: 50px 50px; // row column
padding: 50px 20px 0 20px;
font-size: var(--font-root-regular);
justify-content: center;

@media (min-width: 700px) {
grid-template-columns: repeat(2, minmax(280px, 380px));
}

@media (min-width: 1200px) {
grid-template-columns: repeat(3, minmax(280px, 380px));
}

`,
Sidebar = styled.aside`
position: absolute;
height: 100%;
max-height: 100vh;
display: flex;
background-color: pink;
`,
LoadingScreen = styled.div`
min-width: 100%;
min-height: 100%;
display: flex;
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
