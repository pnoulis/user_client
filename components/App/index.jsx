export * from "./Layout";
import {APP_STORE} from "lib/stores";
import {ListFlashMessages} from "components/Flash-messages";


export function App({children}) {
  const {app, setApp} = APP_STORE.useApp();
  return (
    <APP_STORE.appContext.Provider value={{app, setApp}}>
      {children}
      <ListFlashMessages/>
    </APP_STORE.appContext.Provider>
  );
}
