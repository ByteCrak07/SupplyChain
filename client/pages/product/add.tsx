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

const AddProduct: NextPage = () => {
  const { user, contract } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    contract
      ?.addProduct(name, type, Date.now(), quantity, price, currency)
      .then(() => {
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
      <NextSeo title="Sign Up | KCART" />
      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-32">
        <h1 className="text-3xl font-Merriweather text-center">
          Add new product
        </h1>

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
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              required
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
              maxLength={100}
            />

            <input
              id="type"
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              placeholder="Product Type"
              required
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            />

            <input
              id="quantity"
              type="text"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              placeholder="Product Quantity"
              required
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            />

            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Price"
              required
              className="outline-none font-medium w-full py-2 px-3 rounded-md border border-black border-opacity-20 focus:shadow focus:ring-1 focus:ring-black"
            />

            <input
              id="currency"
              type="text"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              placeholder="Currency"
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
              Create Product
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

export default AddProduct;
