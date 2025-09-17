// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

const noFlash = `
(function() {
  try {
    var ls = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (ls === 'dark' || (!ls && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
`;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Prevent dark-mode flash */}
          <script dangerouslySetInnerHTML={{ __html: noFlash }} />

          {/* Favicons */}
          <link rel="icon" href="/images/logo.JPG" sizes="any" />
          <link rel="icon" type="image/svg+xml" href="/images/logo.JPG" />
          <link rel="apple-touch-icon" href="/images/logo.JPG" />

          {/* Pinned tab (optional if you create one) */}
          {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ef4444" /> */}

          {/* Theming */}
          <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

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