import type { NextPage } from "next";
import { FormEvent, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import RingSpinner from "../../components/loaders/ringSpinner";
import { showToast } from "../../components/layout/toast";

const ShipProduct: NextPage = () => {
  const { user, contract } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [productId, setProductId] = useState<string>("");
  const [nextHolder, setNextHolder] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    contract
      ?.addDeparture(productId, Date.now(), nextHolder)
      .then(() => {
        console.log("work");
        setLoading(false);
      })
      .catch((err) => {
        let errString = JSON.stringify(err);

        showToast(JSON.parse(errString).error.rawMessage);

        setLoading(false);
      });
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <NextSeo title="Ship Product | KCART" />
      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-32">
        <h1 className="text-3xl font-Merriweather text-center">Ship product</h1>

        <div className="w-full">
          <style jsx>{`
            select:invalid {
              color: rgb(156 163 175);
            }
          `}</style>
          <form
            className="p-10 max-w-xl mx-auto flex flex-col items-center gap-y-2"
            onSubmit={handleSubmit}
          >
            <input
              id="productId"
              type="text"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              placeholder="Product Id"
              required
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
              maxLength={100}
            />

            <input
              id="holder"
              type="text"
              value={nextHolder}
              onChange={(e) => {
                setNextHolder(e.target.value);
              }}
              placeholder="Next holder"
              required
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-3 flex items-center bg-black hover:bg-opacity-70 px-3 py-2 text-white rounded-md ${
                loading ? "bg-opacity-70" : ""
              }`}
            >
              Ship Product
              {loading ? (
                <div className="ml-2">
                  <RingSpinner width={20} color="white" />
                </div>
              ) : (
                ""
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipProduct;
