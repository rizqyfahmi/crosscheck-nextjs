import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import 'reflect-metadata';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import container, { ContainerProvider } from '../src/utils/locator/locator';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContainerProvider container={container}>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
        <title>CrossCheck</title>
      </Head>
      <Component {...pageProps} />
    </ContainerProvider>
  )
}

export default MyApp
