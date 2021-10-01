import styled from "styled-components";

const
Pages = styled.div`
display: flex;
flex-flow: row nowrap;
height: max-content;
width: max-content;
margin-left: auto;
margin-right: auto;
margin-bottom: 20px;
justify-content: center;
align-items: center;
`,
PageTurner = styled.p`
flex: 1;
box-sizing: content-box;
padding: 10px 30px;
width: 40px;
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
`,
Page = styled.span`
box-sizing: content-box;
width: 40px;
height: 40px;
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

function Pager({pages, handleNextPage}) {

  return (
    <Pages>
      <PageTurner left>
        <img src="/right-arrow-angle.png" alt="left-arrow"/>
      </PageTurner>
      {pages.map((page, i) => {
        return (
          <Page key={i} selected={page}>{i + 1}</Page>
        );
      })}
      <PageTurner>
        <img src="/right-arrow-angle.png" alt="right-arrow"/>
      </PageTurner>
    </Pages>

  );
}
export default Pager;
