import { FC, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";
import RingSpinner from "../loaders/ringSpinner";
import { FaAngleDown } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import { showToast } from "./toast";

// components

const Header: FC = () => {
  const { user, setUser, userData, setUserData, login, logout } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      const modal = document.getElementById(`userModal`);
      const walletBtn = document.getElementById(`walletBtn`);

      if (target && modal && walletBtn) {
        if (
          modal.contains(target as Node) ||
          walletBtn.contains(target as Node)
        )
          return;

        // if clicked outside
        setShowUserModal(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="py-5 px-10 bg-white">
      <div className="flex w-full justify-between">
        <Link href="/">
          <a>
            <Image
              src={"/logo.svg"}
              alt="KCART"
              height={50}
              width={50 * 3.84}
            />
          </a>
        </Link>
        <nav className="flex items-center">
          <div className="px-10">
            <Link href={"/product/all"}>
              <a className="hover:underline">All products</a>
            </Link>
          </div>
          <div className="relative">
            <button
              id="walletBtn"
              className="bg-[#8247e5] flex px-3 py-2 rounded-full items-center gap-x-2"
              disabled={user === undefined}
              onClick={() => {
                if (!user) login();
                else setShowUserModal(!showUserModal);
              }}
            >
              <div className="rounded-full bg-white w-9 h-9 flex items-center justify-center">
                <Image
                  src={"/polygon-logo.svg"}
                  alt="KCART"
                  height={25}
                  width={25}
                />
              </div>

              {!user ? (
                user === undefined ? (
                  <div className="text-white font-Roboto">
                    <RingSpinner width={25} color="white" />
                  </div>
                ) : (
                  <div className="text-white font-Roboto">Connect</div>
                )
              ) : (
                <div className="text-white font-Roboto">
                  {`${user.slice(0, 4)}...${user.slice(38, 42)}`}
                  <div className="inline px-5"></div>
                  <FaAngleDown
                    className={`inline transition-transform ${
                      showUserModal ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
            </button>
            {user ? (
              <button
                className="absolute top-3 right-9 rounded px-1 pb-1 text-white bg-transparent hover:bg-opacity-20 hover:bg-white"
                title="Copy public key"
                onClick={() => {
                  navigator.clipboard.writeText(user);
                  showToast("Copied to clipboard");
                }}
              >
                <BiCopy className="inline" />
              </button>
            ) : (
              <></>
            )}
            {showUserModal && user ? (
              <div
                id="userModal"
                className="absolute py-3 px-5 z-10 bg-[#8247e5] rounded-2xl top-[110%] right-2 text-white text-center"
              >
                {userData ? (
                  <>
                    <div className="text-lg font-medium">{userData?.name}</div>
                    <div className="text-xs">{userData?.type}</div>
                  </>
                ) : (
                  <></>
                )}

                <div className="py-3">{userData?.balance} MATIC</div>
                <button
                  onClick={logout}
                  className="text-white hover:text-opacity-70"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
