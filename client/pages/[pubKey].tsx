import type { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Link from "next/link";
import {
  UserProfile,
  WalletAuthContext,
  WalletAuthContextType,
} from "../contexts/walletAuthWrapper";

import { ethers } from "ethers";
import contractAbi from "../utils/contractAbi.json";
import { SupplyChainContract } from "../utils/SupplyChainContract";

import { BsPlusLg } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { TbComet } from "react-icons/tb";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let userData: UserProfile | undefined;
  const publicKey = String(params?.pubKey);

  if (params && ethers.utils.isAddress(publicKey)) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/polygon_mumbai",
      80001
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractAbi.abi,
      provider
    ) as unknown as SupplyChainContract;

    let data = await contract.users(publicKey);
    if (data.name !== "") {
      const balance = await provider.getBalance(publicKey);
      userData = {
        name: data.name,
        type: data.uType ? "Supplier" : "Manufacturer",
        balance: Number(ethers.utils.formatEther(balance)).toFixed(3),
        walletKey: publicKey,
      };
    }
  }

  if (!userData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { serverUserData: userData, timestamp: new Date().toUTCString() },
  };
};

interface ProfileProps {
  serverUserData: UserProfile | undefined;
}

const ProfilePage: NextPage<ProfileProps> = ({ serverUserData }) => {
  const { user, setUser, userData, setUserData, login, logout } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const isOwner = userData?.walletKey === serverUserData?.walletKey;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <NextSeo title="Profile | KCART" />
      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-10 text-center">
        <h1 className="text-3xl font-Merriweather">
          {isOwner ? "Welcome" : ""} {serverUserData?.name}
        </h1>
        <div className="text-xs">Public key: {serverUserData?.walletKey}</div>
        <h2 className="text-sm mt-5">User type: {serverUserData?.type}</h2>
        {isOwner ? (
          <div className="mt-5">
            Your current balance is{" "}
            <span className="text-xl">{serverUserData?.balance} MATIC</span>
          </div>
        ) : (
          <></>
        )}
      </div>

      {isOwner ? (
        <div className="mb-32 flex gap-x-10">
          {serverUserData?.type === "Manufacturer" ? (
            <Link href={"/product/add"}>
              <button className="bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md flex items-center text-lg">
                <BsPlusLg /> &nbsp; Add new product
              </button>
            </Link>
          ) : (
            <></>
          )}
          {serverUserData?.type === "Supplier" ? (
            <Link href={"/product/receive"}>
              <button className="bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md flex items-center text-lg">
                <TbComet /> &nbsp; Reg. received product
              </button>
            </Link>
          ) : (
            <></>
          )}
          <Link href={"/product/ship"}>
            <button className="bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md flex items-center text-lg">
              <MdLocalShipping /> &nbsp; Ship to supplier
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePage;
