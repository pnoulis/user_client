import {useEffect} from "react";
import {usePersistentTimeout, useResize} from "lib/hooks";
import {APP_STORE} from "lib/stores";
import {backend, time} from "lib/utils";
import ListFlashMessages from "components/Flash-messages";
import styled from "styled-components";
import Header from "components/Header";
import Footer from "components/Footer";

const
Root = styled.article`
flex: 1;
display: flex;
min-width: 100%;
min-height: 100%;
flex-flow: column nowrap;
background-color: rgba(160, 169, 200, 0.3);
`,
Main = styled.main`
flex: 1;
min-width: 100%;
min-height: 100%;
display: flex;
position: relative;
`;
export
const
StandardLayout = ({children}) => {
  return (
    <Root>
      <Header/>
      <Main id="main-content">
        {children}
        <ListFlashMessages container="main-content"/>
      </Main>
      <Footer/>
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
export default function App({children}) {
  const {app, setApp} = APP_STORE.useApp();
  const resize = useResize();
  const sessionTimeout = usePersistentTimeout();

  // on login
  useEffect(() => {
    if (app.loggedIn) sessionTimeout(
      () => setApp("logout"),
      "sessTimeout",
      app.expires ? app.expires - Date.now() : time.expireIn("30s"),
    );
  }, [app.loggedIn]);

  //on mount
  useEffect(() => {
    backend.get({url: "/session"})
      .then(res => res.ok && setTimeout(() => setApp("login", res.payload), 1000))
      .catch(err => console.log(err));
  }, []);

  // on resize event
  useEffect(() => {
    if (!resize) return;
    setApp("forceRedraw");
  }, [resize]);

  return (
    <APP_STORE.AppContext.Provider key={app.key} value={{app, setApp}}>
      {children}
    </APP_STORE.AppContext.Provider>
  );
}
