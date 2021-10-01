export * from "./Layout";
import {APP_STORE} from "lib/stores";


export function App({children}) {
  const {app, setApp} = APP_STORE.useApp();
  return (
    <APP_STORE.appContext.Provider value={{app, setApp}}>
      {children}
    </APP_STORE.appContext.Provider>
  );
}
