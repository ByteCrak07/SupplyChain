import "../styles/globals.css";
import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";
import Layout from "../components/layout";
import WalletAuthWrapper from "../contexts/walletAuthWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletAuthWrapper>
      <Layout>
        <DefaultSeo
          title="KCART"
          description="A simple supply chain management system implemented on polygon blockchain."
        />
        <Component {...pageProps} />
      </Layout>
    </WalletAuthWrapper>
  );
}

export default MyApp;
