import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../contexts/walletAuthWrapper";
import { FaSignInAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import Link from "next/link";

const Home: NextPage = () => {
  const { user, setUser, userData, setUserData, login, logout } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="p-20 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-32">
        <h1 className="text-3xl font-Merriweather">Welcome to KCART</h1>
        <h2 className="font-Poppins font-medium text-xs">
          A supply chain management system on polygon blockchain
        </h2>

        <div className="mt-10 font-Roboto flex flex-col gap-y-2">
          <div className="text-xl mb-2">Here are some things you can do...</div>

          {user ? (
            <Link href={`/${userData?.name ? user : "signUp"}`}>
              <button
                disabled={user === undefined}
                className={`bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md ${
                  user === undefined ? "cursor-wait" : ""
                }`}
              >
                <FaSignInAlt className="inline" /> &nbsp;{" "}
                {userData?.name ? "Go to your account" : "Create your account"}
              </button>
            </Link>
          ) : (
            <button
              className={`bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md`}
              onClick={() => {
                login();
              }}
            >
              <IoWalletOutline className="inline" /> &nbsp; Connect Wallet
            </button>
          )}

          <Link href="/product">
            <button className="bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md">
              <BsSearch className="inline" /> &nbsp; Find a product
            </button>
          </Link>

          <div className="mt-10 text-right">
            View the Contract{" "}
            <a
              href={`https://mumbai.polygonscan.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
