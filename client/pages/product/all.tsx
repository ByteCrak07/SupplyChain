import type { NextPage } from "next";
import { FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Link from "next/link";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import RingSpinner from "../../components/loaders/ringSpinner";
import { showToast } from "../../components/layout/toast";
import { ProductResponse } from "../../utils/SupplyChainContract";

const ShowProducts: NextPage = () => {
  const { user, contract } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [products, setProducts] = useState<Array<ProductResponse>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contract
      ?.getAllProducts()
      .then((products) => {
        setProducts(products);
        console.log("work", products);
        setLoading(false);
      })
      .catch((err) => {
        let errString = JSON.stringify(err);

        showToast(JSON.parse(errString).error.rawMessage);

        setLoading(false);
      });
  }, [contract]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <NextSeo title="All Products | KCART" />
      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-20">
        <h1 className="text-3xl font-Merriweather text-center">All products</h1>
        <div className="mt-10 flex justify-center">
          {loading ? (
            <RingSpinner width={40} color="black" />
          ) : (
            <div className="table">
              <div className="table-row font-Poppins font-semibold">
                <div className="table-cell px-8 py-2">Product Id</div>
                <div className="table-cell px-8 py-2">Name</div>
                <div className="table-cell px-8 py-2">Type</div>
                <div className="table-cell px-8 py-2">Quantity</div>
                <div className="table-cell px-8 py-2">Manufacturer</div>
                <div className="table-cell px-8 py-2">Price</div>
              </div>
              {products?.map((data, i) => (
                <div key={`product${i}`} className="table-row">
                  <div className="table-cell px-8 py-2">
                    <Link href={`/product/${data.uId.toNumber()}`}>
                      <a className="hover:text-blue-700">
                        {data.uId.toString().slice(0, 5)}...
                        {data.uId.toString().slice(11, 14)}
                      </a>
                    </Link>
                  </div>
                  <div className="table-cell px-8 py-2">{data.name}</div>
                  <div className="table-cell px-8 py-2">{data.pType}</div>
                  <div className="table-cell px-8 py-2">{data.quantity}</div>
                  <div className="table-cell px-8 py-2">
                    <Link href={`/${data.manufacturer}`}>
                      <a className="hover:text-blue-700">
                        {`${data.manufacturer.slice(
                          0,
                          6
                        )}...${data.manufacturer.slice(36, 42)}`}
                      </a>
                    </Link>
                  </div>
                  <div className="table-cell px-8 py-2">
                    {data.price + " " + data.currency}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;
