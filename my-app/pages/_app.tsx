import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )
}

//The Component passed to the App component is determined by the current route. In this case, it's the Home component from the index.tsx file.
