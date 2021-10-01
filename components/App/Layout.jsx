import styled from "styled-components";
import Header from "components/Header";
import {Footer} from "components/Footer";
import {ListFlashMessages} from "components/Flash-messages";


const
Root = styled.article`
flex: 1;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: auto 1fr;
`,
HeaderWrapper = styled.header`
grid-column: 1/2;
grid-row: 1/2;
`,
Main = styled.main`
grid-column: 1/2;
grid-row: 2/3;
background-color: inherit;
display: ${props => props.center && "flex"};
justify-content: ${props => props.center && "center"};
align-items: ${props => props.center && "center"};
position: relative;
padding: 2px 2px 30px 2px;
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
      <Main>
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
