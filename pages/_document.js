/* eslint-disable react/display-name */
import Document, {Html, Head, Main, NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      const enhanceApp = App => props => sheet.collectStyles(<App {...props}/>);
      ctx.renderPage = () => originalRenderPage({enhanceApp});
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (<>{initialProps.styles}{sheet.getStyleElement()}</>),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}
