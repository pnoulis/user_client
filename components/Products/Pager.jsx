import styled from "styled-components";
import Router from "next/router";

const
Pages = styled.div`
display: flex;
flex-flow: row nowrap;
width: 100%;
min-height: 40px;
justify-content: center;
align-items: center;
background-color: var(--color-secondary);
margin-bottom: 6px;
border-radius: 10px;

@media (min-width: 1100px) {
height: 60px;
}
`,
PageTurner = styled.p`
box-sizing: content-box;
padding: 5px 20px;
width: 25px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;

img {
display: inline-block;
width: 100%;
height: 100%;
transform: ${props => props.left && "rotate(180deg)"};
}

@media (min-width: 1100px) {
width: 35px;
}
`,
Page = styled.span`
box-sizing: content-box;
// width: 40px;
// height: 40px;
width: 30px;
height: 30px;
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
color: white;
border-radius: 50%;
background-color: grey;
font-size: var(--font-size-large);
background-color: ${props => props.selected ? "var(--color-honey)" : "var(--color-secondary)"};

margin-right: 15px;
&:first-of-type {
margin-left: 4px;

}
&:last-of-type {
margin-right: 4px;
}
`;

function Pager({pages, category}) {
  function handlePageTurn(next) {
    let nextPage = pages.findIndex(pg => !!pg);
    nextPage += next ? 1 : -1;
    if (nextPage > pages.length - 1 || nextPage < 0) return null;
    Router.push(`/products/${category}/${nextPage + 1}`);
  };
  return (
    <Pages>
      <PageTurner left onClick={() => handlePageTurn(false)}>
        <img src="/right-arrow-angle.png" alt="left-arrow"/>
      </PageTurner>
      {pages.map((page, i) => {
        return (
          <Page key={i} selected={page}>{i + 1}</Page>
        );
      })}
      <PageTurner onClick={() => handlePageTurn(true)}>
        <img src="/right-arrow-angle.png" alt="right-arrow"/>
      </PageTurner>
    </Pages>
  );
}
export default Pager;
