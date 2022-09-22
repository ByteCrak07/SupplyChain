import {
  FC,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import { useRouter } from "next/router";
import contractAbi from "../utils/contractAbi.json";
import { SupplyChainContract } from "../utils/SupplyChainContract";

interface UserProfile {
  walletKey: string;
  balance: string;
  name?: string;
  type?: "Manufacturer" | "Supplier";
}

interface WalletAuthContextType {
  user: string | null | undefined;
  setUser: Dispatch<SetStateAction<string | null | undefined>>;
  userData: UserProfile | null;
  setUserData: Dispatch<SetStateAction<UserProfile | null>>;
  contract?: SupplyChainContract;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const WalletAuthContext = createContext<WalletAuthContextType | null>(null);

const WalletAuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  // states
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [magic, setMagic] = useState<Magic<ConnectExtension[]>>();
  const [provider, setProvider] = useState<Web3Provider>();
  const [contract, setContract] = useState<SupplyChainContract>();

  // router
  const router = useRouter();

  // assign user when userdata is present
  useEffect(() => {
    if (userData) setUser(userData.walletKey);
  }, [userData]);

  // initialise ethers
  useEffect(() => {
    const polygon = {
      rpcUrl: "https://rpc-mainnet.maticvigil.com/",
      chainId: 137,
    };

    const polygonMumbai = {
      rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
    };

    const newMagic = new Magic(
      process.env.NEXT_PUBLIC_MAGIC_CONNECT_PUBLIC_KEY,
      {
        extensions: [new ConnectExtension()],
        network: polygonMumbai,
      }
    );

    const ethersProvider = new ethers.providers.Web3Provider(
      newMagic.rpcProvider as any
    );

    if (!magic) setMagic(newMagic);
    if (!provider) setProvider(ethersProvider);
  }, [provider, magic]);

  // autologin
  useEffect(() => {
    const autoLogin = async () => {
      const accounts = await provider?.listAccounts();

      if (accounts) setUser(accounts[0]);
      else if (provider) setUser(null);
    };

    if (window.localStorage.getItem("LoggedIn") === "true") autoLogin();
    else setUser(null);
  }, [magic, provider]);

  // connect contract
  useEffect(() => {
    if (user && !contract) {
      const signer = provider?.getSigner();
      const supplyChainContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        contractAbi.abi,
        signer
      ) as unknown as SupplyChainContract;

      setContract(supplyChainContract);

      let tempUserData: UserProfile = {
        walletKey: user,
        balance: "0",
      };

      supplyChainContract.users(user).then((val) => {
        if (val.name !== "")
          tempUserData = {
            ...tempUserData,
            name: val.name,
            type: val.uType ? "Supplier" : "Manufacturer",
          };

        provider?.getBalance(user).then((bal) => {
          tempUserData = {
            ...tempUserData,
            balance: Number(ethers.utils.formatEther(bal)).toFixed(3),
          };

          setUserData(tempUserData);
        });
      });
    }
  }, [provider, user, contract, router]);

  const login = async () => {
    if (provider) {
      setUser(undefined);
      provider
        .listAccounts()
        .then((accounts) => {
          window.localStorage.setItem("LoggedIn", "true");

          if (accounts) setUser(accounts[0]);
          else setUser(null);
        })
        .catch((err) => {
          setUser(null);
          console.log(err);
        });
    }
  };

  const logout = async () => {
    await magic?.connect.disconnect();
    window.localStorage.removeItem("LoggedIn");
    setUser(null);
    router.reload();
  };

  // get user details from contract

  return (
    <WalletAuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        contract,
        login,
        logout,
      }}
    >
      {children}
    </WalletAuthContext.Provider>
  );
};

export default WalletAuthWrapper;
export { WalletAuthContext };
export type { WalletAuthContextType, UserProfile };
