import { GetServerSideProps } from 'next';
import { AppProps } from 'next/app'

import React from 'react';

import GlobalStyle from '../styles/global'

import AppProvider from '../hooks';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}
