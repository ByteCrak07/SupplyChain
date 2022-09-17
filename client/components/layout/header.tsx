import { FC, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  WalletAuthContext,
  WalletAuthContextType,
} from "../../contexts/walletAuthWrapper";

// components

const Header: FC = () => {
  const { user, setUser, userData, setUserData, login, logout } = useContext(
    WalletAuthContext
  ) as WalletAuthContextType;

  return (
    <header className="py-5 px-10">
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
        <nav>
          <button
            className="bg-violet-500 flex px-3 py-2 rounded-full items-center gap-x-2"
            disabled={user === undefined}
            onClick={() => {
              console.log("hlo");
              if (!user) login();
              else logout();
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
            {console.log(user)}
            {!user ? (
              user === undefined ? (
                <div className="text-white font-Roboto">Loading...</div>
              ) : (
                <div className="text-white font-Roboto">Connect</div>
              )
            ) : !userData ? (
              <div className="text-white font-Roboto">
                {`${user.slice(0, 4)}...${user.slice(38, 42)}`}
              </div>
            ) : (
              <div className="text-white font-Roboto">
                userdata
                {`${user.slice(0, 4)}...${user.slice(38, 42)}`}
              </div>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
