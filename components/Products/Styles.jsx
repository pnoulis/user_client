import styled from "styled-components";


export
const
Root = styled.article`
position: relative;
display: grid;
grid-template-columns: minmax(280px, 350px);
grid-template-rows: auto;
background-color: green;
min-width: 100%;
min-height: 100%;
gap: 50px 50px; // row column
padding: 50px 20px;
font-size: var(--font-root-regular);
justify-content: center;

@media (min-width: 700px) {
grid-template-columns: repeat(2, minmax(280px, 350px));
}

@media (min-width: 1100px) {
grid-template-columns: repeat(3, minmax(280px, 350px));
}

`,
Sidebar = styled.aside`
position: absolute;
width: 100px;
height: 100px;
background-color: pink;
`;
