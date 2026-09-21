// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicons */}
          <link rel="icon" href="/images/logo.JPG" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/images/logo.JPG" />
          <link rel="apple-touch-icon" href="/images/logo.JPG" />

          {/* Pinned tab (optional if you create one) */}
          {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef4444" /> */}

          {/* Theming */}
          <meta name="theme-color" content="#0b0b0c" />

          {/* Social preview (optional; create /og-image.jpg) */}
          {/* <meta property="og:image" content="/og-image.jpg" /> */}
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}