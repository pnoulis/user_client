import styled from "styled-components";
import Header from "components/Header";
import Footer from "components/Footer";
import ListFlashMessages from "components/Flash-messages";


const
Root = styled.article`
flex: 1;
display: flex;
min-width: 100%;
min-height: 100%;
flex-flow: column nowrap;
background-color: rgba(160, 169, 200, 0.3);
`,
HeaderWrapper = styled.header`
`,
Main = styled.main`
flex: 1;
min-width: 100%;
min-height: 100%;
display: flex;
position: relative;
`,
FooterWrapper = styled.footer`
`;

export
const
StandardLayout = ({children}) => {
  return (
    <Root>
      <HeaderWrapper>
        <Header/>
      </HeaderWrapper>
      <Main id="main-content">
        {children}
        <ListFlashMessages/>
      </Main>
      <FooterWrapper>
        <Footer/>
      </FooterWrapper>
    </Root>
  );
},
NoLayout = ({children}) => {
  return (
    <Root>
      <Main center>{children}</Main>
    </Root>
  );
};
