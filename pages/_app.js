import "styles/globals.css";
import App from "components/APP.jsx";

function MyApp({ Component, pageProps }) {
  return <App><Component {...pageProps}/></App>;
}

export default MyApp;
