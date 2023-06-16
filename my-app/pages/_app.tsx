import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Modal from '@/components/Modal'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    {/* <Modal actionLabel="Submit"isOpen title="Test Modal"/> */}
    <RegisterModal />
    <LoginModal />
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </>
  )
}

//The Component passed to the App component is determined by the current route. In this case, it's the Home component from the index.tsx file.
