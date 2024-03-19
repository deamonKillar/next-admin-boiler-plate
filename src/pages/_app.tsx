import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import Head from "next/head";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import AclGuard from "@/Guards/AclGuard";
import Layouts from "@/layouts/Layouts";

export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const guestGuard = Component.guestGuard  ?? false;

  return (
    <RecoilRoot>
      <Head>
        <title>AIBuddy</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"
        />
      </Head>
      <ToastContainer />
      <AuthProvider>
        {/* <Guest guestGuard={guestGuard}> */}
        {/* @ts-ignore */}
        <AclGuard guestGuard={guestGuard}>
          <Layouts guestGuard={guestGuard}>
            <Component {...pageProps} />
          </Layouts>
        </AclGuard>
        {/* </Guest> */}
      </AuthProvider>
    </RecoilRoot>
  );
}
