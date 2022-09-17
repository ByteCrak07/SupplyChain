import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextSeo } from "next-seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../contexts/walletAuthWrapper";

const CreateUser: NextPage = () => {
  const { user, contract } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [name, setName] = useState<string>();

  return (
    <div className="p-10">
      <NextSeo title="Create User | KCART" />
      <h2 className="text-xl">Create new user</h2>
      <div className="w-full">
        <form className="p-10 max-w-xl mx-auto">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            className="outline-none font-medium w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
            maxLength={100}
          />
          <select className="mt-3 outline-none bg-white font-medium w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark">
            <option selected hidden>
              Select user type
            </option>
            <option>Manufacturer</option>
            <option>Supplier</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
