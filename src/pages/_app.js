import '@/styles/globals.css'
import "@/assets/scss/themes.scss";

import Layout from "@/Layouts";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
