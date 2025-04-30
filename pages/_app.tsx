import type { AppProps } from 'next/app';
import '../pages/globals.css';
import { Noto_Sans } from 'next/font/google';
import Header from '../components/header';

const notoSans = Noto_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-noto-sans',
    display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={notoSans.variable}>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
