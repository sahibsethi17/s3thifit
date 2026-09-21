// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Bebas_Neue, Inter } from 'next/font/google';
import { MotionProvider } from '../components/motion';

const display = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${display.variable} ${sans.variable} font-sans`}>
      <MotionProvider>
        <Component {...pageProps} />
      </MotionProvider>
    </div>
  );
}
