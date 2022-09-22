import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import { useRouter } from "next/router";
import { QrReader } from "react-qr-reader";
import { MdQrCode2 } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

const ProductPage: NextPage = () => {
  const { user, setUser, userData, setUserData, login, logout } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [searchMode, setSearchMode] = useState<"type" | "qr" | null>(null);
  const [productId, setProductId] = useState<string>();
  const [qrData, setQrData] = useState("");

  const router = useRouter();

  const submitForm = () => {
    router.push(`/product/${productId}`);
  };

  useEffect(() => {
    if (qrData.startsWith(window.location.href)) router.push(qrData);
  }, [qrData, router]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <NextSeo title="Find product | KCART" />
      <div className="p-16 w-4/5 bg-white bg-opacity-90 backdrop-blur-xl rounded-lg mb-32">
        <h1 className="text-3xl font-Merriweather text-center">
          Search for a product
        </h1>

        {!searchMode ? (
          <div className="mt-10 font-Roboto flex justify-center gap-x-5 text-xl">
            <button
              onClick={() => {
                setSearchMode("type");
              }}
              className="bg-black hover:bg-opacity-70 p-3 text-white rounded-md"
            >
              <BsSearch className="inline" /> &nbsp; Enter product id
            </button>
            <button
              onClick={() => {
                setSearchMode("qr");
              }}
              className="bg-black hover:bg-opacity-70 p-3 text-white rounded-md"
            >
              <MdQrCode2 className="inline" /> &nbsp; Scan QR code
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {searchMode === "type" ? (
              <div>
                <form
                  className="p-10 max-w-xl mx-auto flex gap-x-2"
                  onSubmit={submitForm}
                >
                  <input
                    id="productId"
                    type="text"
                    value={productId}
                    onChange={(e) => {
                      setProductId(e.target.value);
                    }}
                    placeholder="Product Id"
                    className="outline-none font-medium w-full py-2 px-3 rounded-md border border-lit-dark border-opacity-20 focus:shadow focus:ring-1 focus:ring-lit-dark"
                    maxLength={100}
                  />
                  <button
                    type="submit"
                    className="bg-black hover:bg-opacity-70 p-3 text-white rounded-md"
                  >
                    Search
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-72 h-72 mt-10 mx-auto relative">
                <QrReader
                  scanDelay={1000}
                  constraints={{
                    facingMode: "environment",
                    aspectRatio: 1,
                  }}
                  onResult={(result, error) => {
                    if (!!result) {
                      setQrData(result?.getText());
                    }
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="h-full w-full bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: "url(/qr-frame.png)",
                    }}
                  ></div>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                setSearchMode(null);
              }}
              className="bg-black w-32 mt-2 hover:bg-opacity-70 p-3 text-white rounded-md"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
