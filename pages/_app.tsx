import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Html } from 'next/document';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
        <title>CrossCheck</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
