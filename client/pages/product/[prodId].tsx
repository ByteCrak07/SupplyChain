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
import {
  ViewproductResponse,
  ProductResponse,
  AllTransitsResponse,
} from "../../utils/SupplyChainContract";
import { QRCodeSVG } from "qrcode.react";
import { DDMMMYYYYTwelveHr } from "../../utils/dateTime";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let productData: ProductResponse | undefined;
  let transitData: AllTransitsResponse[] | undefined;

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

    try {
      let data = await contract.getProduct(params.prodId as string);
      if (data) {
        productData = { ...data.product };
        transitData = { ...data.allTransits };
      }
    } catch (err) {
      console.log(err);
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
      transitData: JSON.parse(JSON.stringify(transitData)),
      timestamp: new Date().toUTCString(),
    },
  };
};

interface ViewProductProps {
  productData: ProductResponse | undefined | any;
  transitData: AllTransitsResponse[] | undefined | any;
}

const ViewProduct: NextPage<ViewProductProps> = ({
  productData,
  transitData,
}) => {
  const { user, contract } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [host, setHost] = useState("");

  useEffect(() => {
    if (window) setHost(window.location.href);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <NextSeo
        title={
          productData.name ? `${productData.name} | KCART` : `Product | KCART`
        }
      />

      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mt-5 mb-10">
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
                  Manufactured on:{" "}
                  {DDMMMYYYYTwelveHr(
                    new Date(parseInt(productData.manTime.hex, 16))
                  )}
                </div>
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
              <QRCodeSVG value={host} />
            </div>
          </div>
        )}
      </div>
      {transitData ? (
        <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-5 flex justify-center">
          <div className="table">
            <div className="table-row font-Poppins font-semibold">
              <div className="table-cell px-8 py-2">Time</div>
              <div className="table-cell px-8 py-2">Holder</div>
              <div className="table-cell px-8 py-2">Type</div>
            </div>
            {Object.values(transitData)
              .reverse()
              ?.map((transit: any, i) => (
                <div key={`transit${i}`} className="table-row">
                  <div className="table-cell px-8 py-2">
                    {DDMMMYYYYTwelveHr(new Date(parseInt(transit[2].hex, 16)))}
                  </div>
                  <div className="table-cell px-8 py-2">
                    <Link href={`/product/${transit[0]}`}>
                      <a className="hover:text-blue-700">
                        {transit[0].slice(0, 7)}...
                        {transit[0].slice(10, 14)}
                      </a>
                    </Link>
                  </div>
                  <div className="table-cell px-8 py-2">
                    {transit[1] ? "Departure" : "Arrival"}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ViewProduct;
