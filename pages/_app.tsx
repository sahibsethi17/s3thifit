// pages/_app.tsx
import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Bebas_Neue, Inter } from 'next/font/google';
import { MotionProvider } from '../components/motion';
import { GOOGLE_ADS_ID, trackPageView } from '../lib/gtag';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // The tag records the first page itself; this records in-app navigation (e.g. home → /assessment)
  useEffect(() => {
    router.events.on('routeChangeComplete', trackPageView);
    return () => router.events.off('routeChangeComplete', trackPageView);
  }, [router.events]);

  return (
    <div className={`${display.variable} ${sans.variable} font-sans`}>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
      <MotionProvider>
        <Component {...pageProps} />
      </MotionProvider>
    </div>
  );
}
