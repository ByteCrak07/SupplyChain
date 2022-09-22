import { ReactNode, FC } from "react";
import Footer from "./footer";
import Header from "./header";
import Toast from "./toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="flex flex-col h-screen"
      style={{
        background: "url(/supplychain.png) no-repeat fixed center",
        backgroundSize: "cover",
      }}
    >
      <Header />

      <main className="flex-1 bg-black bg-opacity-20 backdrop-blur-sm">
        {children}
      </main>

      <Toast />
      <Footer />
    </div>
  );
};

export default Layout;
