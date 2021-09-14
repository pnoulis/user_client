import styled from "styled-components";
import Header from "components/Header";
import {Footer} from "components/Footer";


const
Root = styled.article`
flex: 1;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: auto 1fr auto;
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
padding: 2px;
`,
FooterWrapper = styled.footer`
grid-column: 1/2;
grid-row: 3/4;
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
