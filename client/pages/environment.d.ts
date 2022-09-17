import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAGIC_CONNECT_PUBLIC_KEY: string;
      NEXT_PUBLIC_CONTRACT_ADDRESS: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
