import type { GetServerSideProps, NextPage } from "next";
import { FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import Link from "next/link";

import { ethers } from "ethers";
import contractAbi from "../../utils/contractAbi.json";
import { SupplyChainContract } from "../../utils/SupplyChainContract";

import RingSpinner from "../../components/loaders/ringSpinner";
import { showToast } from "../../components/layout/toast";
import { ProductsResponse } from "../../utils/SupplyChainContract";
import { QRCodeSVG } from "qrcode.react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let productData: ProductsResponse | undefined;

  if (params && params.prodId && params.prodId.length === 15) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/polygon_mumbai",
      80001
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      contractAbi.abi,
      provider
    ) as unknown as SupplyChainContract;

    let data = await contract.products(params.prodId as string);
    if (data.name !== "" && data.pType !== "") {
      productData = { ...data };
    }
  }

  if (!productData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productData: JSON.parse(JSON.stringify(productData)),
      timestamp: new Date().toUTCString(),
    },
  };
};

interface ViewProductProps {
  productData: ProductsResponse | any | undefined;
}

const ViewProduct: NextPage<ViewProductProps> = ({ productData }) => {
  const { user, contract } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [host, setHost] = useState("");

  useEffect(() => {
    if (window) setHost(window.location.href);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <NextSeo title="Sign Up | KCART" />
      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-32">
        {!productData ? (
          <RingSpinner width={40} color="black" />
        ) : (
          <div className="flex justify-evenly">
            <div>
              <h1 className="text-2xl font-Merriweather">
                {productData.name}{" "}
                <span className="text-xs">
                  (ID: {parseInt(productData.uId.hex, 16).toString()})
                </span>
              </h1>
              <div className="text-lg font-OpenSans mt-10 flex flex-col gap-y-2">
                <div>Type: {productData.pType}</div>
                <div>Quantity: {productData.quantity}</div>

                <div>
                  Manufacturer:{" "}
                  <Link href={`/${productData.manufacturer}`}>
                    <a className="hover:text-blue-700">
                      {productData.manufacturer}
                    </a>
                  </Link>
                </div>
                <div>
                  Price: {productData.price + " " + productData.currency}
                </div>
              </div>
            </div>
            <div>
              <QRCodeSVG
                value={`${host}/product/${parseInt(
                  productData.uId.hex,
                  16
                ).toString()}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
