import '../styles/globals.css'
import {Toaster} from 'react-hot-toast';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Modal from '@/components/Modal'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal';
import {SessionProvider} from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
    {/* <Modal actionLabel="Submit"isOpen title="Test Modal"/> */}
    <RegisterModal />
    <LoginModal />
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}

//The Component passed to the App component is determined by the current route. In this case, it's the Home component from the index.tsx file.
