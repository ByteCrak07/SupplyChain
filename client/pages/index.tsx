import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../contexts/walletAuthWrapper";

const Home: NextPage = () => {
  const { user, setUser, userData, setUserData, login, logout } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  return (
    <div className="p-10">
      <NextSeo />
      Home
    </div>
  );
};

export default Home;
