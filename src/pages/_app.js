import "@/styles/globals.css";
import "@/assets/scss/themes.scss";

import Layout from "@/Layouts";
import NonAuthLayout from "@/Layouts/NonAuthLayout";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SessionProvider session={pageProps.session}>
      {router.pathname.includes("Authentication") ? (
        <NonAuthLayout>
          <Component {...pageProps} />
        </NonAuthLayout>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}
